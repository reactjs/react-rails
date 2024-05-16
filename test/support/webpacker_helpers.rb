# frozen_string_literal: true

module ShakapackerHelpers
  PACKS_DIRECTORY = File.expand_path("../dummy/public/packs", __dir__)

  module_function

  def available?
    !!defined?(Shakapacker)
  end

  def when_shakapacker_available
    return unless available?

    yield
  end

  def compile
    return unless available?

    clear_shakapacker_packs
    Dir.chdir("./test/dummy") do
      Rake::Task["shakapacker:compile"].reenable
      Rake::Task["shakapacker:compile"].invoke
    end
    # Reload cached JSON manifest:
    manifest_refresh
  end

  def compile_if_missing
    return if File.exist?(PACKS_DIRECTORY)

    compile
  end

  def clear_shakapacker_packs
    FileUtils.rm_rf(PACKS_DIRECTORY)
  end

  # Start a webpack-dev-server
  # Call the block
  # Make sure to clean up the server
  def with_dev_server
    old_env = ENV.fetch("NODE_ENV", nil)
    ENV["NODE_ENV"] = "development"

    # Start the server in a forked process:
    Dir.chdir("test/dummy") do
      spawn "RAILS_ENV=development ./bin/shakapacker-dev-server"
    end

    stop_time = Time.now + 30.seconds
    detected_dev_server = false
    loop do
      detected_dev_server = dev_server_running?
      break if detected_dev_server || Time.now > stop_time

      sleep 0.5
    end

    # If we didn't hook up with a dev server after waiting, fail loudly.
    raise "Failed to start dev server" unless detected_dev_server

    puts "Detected dev server - Continuing"

    # Call the test block:
    yield
  ensure
    check_cmd = "lsof -i :8080 -S"
    10.times do
      # puts check_cmd
      status = `#{check_cmd}`
      # puts status
      remaining_pid_match = status.match(/\n[a-z]+\s+(\d+)/)
      break unless remaining_pid_match

      remaining_pid = remaining_pid_match[1]
      # puts "Remaining #{remaining_pid}"
      kill_cmd = "kill -9 #{remaining_pid}"
      # puts kill_cmd
      `#{kill_cmd}`
      sleep 0.5
    end

    # Remove the dev-server packs:
    ShakapackerHelpers.clear_shakapacker_packs
    ENV["NODE_ENV"] = old_env
    puts "Killed."
  end

  def dev_server_running?
    Shakapacker.instance.instance_variable_set(:@config, nil)
    return false unless Shakapacker.dev_server.running?

    ds = Shakapacker.dev_server
    example_asset_path = manifest_data.values.first
    return false unless example_asset_path

    begin
      file = URI.parse("#{ds.protocol}://#{ds.host}:#{ds.port}#{example_asset_path}").open
    rescue StandardError
      file = nil
    end
    unless file
      puts "Dev server is not serving assets yet"
      return false
    end
    true
  end

  def manifest_refresh
    Shakapacker.manifest.refresh
  end

  def manifest_lookup
    Shakapacker.manifest
  end

  def manifest_data
    Shakapacker.manifest.refresh
  end
end
