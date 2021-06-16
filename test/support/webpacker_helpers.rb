module WebpackerHelpers
  PACKS_DIRECTORY =  File.expand_path("../../#{DUMMY_LOCATION}/public/packs", __FILE__)
  begin
    MAJOR, MINOR, PATCH, _ = Bundler.locked_gems.specs.find { |gem_spec| gem_spec.name == 'webpacker' }.version.segments
  rescue
    MAJOR, MINOR, PATCH, _ = [0,0,0]
  end

  module_function
  def available?
    defined?(Webpacker)
  end

  def when_webpacker_available
    if available?
      yield
    end
  end

  def compile
    return unless available?
    clear_webpacker_packs
    Dir.chdir("./test/#{DUMMY_LOCATION}") do
      capture_io do
        Rake::Task['webpacker:compile'].reenable
        Rake::Task['webpacker:compile'].invoke
      end
    end
    # Reload cached JSON manifest:
    manifest_refresh
  end

  def compile_if_missing
    unless File.exist?(PACKS_DIRECTORY)
      compile
    end
  end

  def clear_webpacker_packs
    FileUtils.rm_rf(PACKS_DIRECTORY)
  end

  # Start a webpack-dev-server
  # Call the block
  # Make sure to clean up the server
  def with_dev_server

    old_env = ENV['NODE_ENV']
    ENV['NODE_ENV'] = 'development'

    # Start the server in a forked process:
    Dir.chdir("test/#{DUMMY_LOCATION}") do
      spawn 'RAILS_ENV=development ./bin/webpack-dev-server '
    end

    stop_time = Time.now + 30.seconds
    detected_dev_server = false
    loop do
      detected_dev_server = dev_server_running?
      break if detected_dev_server || Time.now > stop_time
      sleep 0.5
    end

    # If we didn't hook up with a dev server after waiting, fail loudly.
    raise 'Failed to start dev server' unless detected_dev_server
    puts 'Detected dev server - Continuing'

    # Call the test block:
    yield

  ensure
    check_cmd = 'lsof -i :8080 -S'
    10.times do
      # puts check_cmd
      status = `#{check_cmd}`
      # puts status
      remaining_pid_match = status.match(/\n[a-z]+\s+(\d+)/)
      if remaining_pid_match
        remaining_pid = remaining_pid_match[1]
        # puts "Remaining #{remaining_pid}"
        kill_cmd = "kill -9 #{remaining_pid}"
        # puts kill_cmd
        `#{kill_cmd}`
        sleep 0.5
      else
        break
      end
    end

    # Remove the dev-server packs:
    WebpackerHelpers.clear_webpacker_packs
    ENV['NODE_ENV'] = old_env
    puts "Killed."
  end

  if MAJOR < 3 # Old webpackers

    def dev_server_running?
      manifest_refresh
      example_asset_path = manifest_data.values.first
      return false unless example_asset_path
      return false unless example_asset_path.start_with?('http://localhost:8080')
      begin
        file = URI.open('http://localhost:8080/packs/application.js')
      rescue StandardError => e
        file = nil
      end
      unless file
        puts "Manifest doesn't include absolute path to dev server"
        return false
      end
      true
    end

    def manifest_refresh
      Webpacker::Manifest.load
    end

    def manifest_lookup name
      Webpacker::Manifest.load(name)
    end

    def manifest_data
      Webpacker::Manifest.instance.data
    end

  else # New webpackers

    def dev_server_running?
      Webpacker.instance.instance_variable_set(:@config, nil)
      return false unless Webpacker.dev_server.running?

      ds = Webpacker.dev_server
      example_asset_path = manifest_data.values.first
      return false unless example_asset_path
      begin
        file = URI.open("#{ds.protocol}://#{ds.host}:#{ds.port}#{example_asset_path}")
      rescue StandardError => e
        file = nil
      end
      if ! file
        puts "Dev server is not serving assets yet"
        return false
      end
      true
    end

    def manifest_refresh
      Webpacker.manifest.refresh
    end

    def manifest_lookup _
      Webpacker.manifest
    end

    def manifest_data
      Webpacker.manifest.refresh
    end

  end
end
