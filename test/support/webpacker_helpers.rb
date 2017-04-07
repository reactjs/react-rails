module WebpackerHelpers
  PACKS_DIRECTORY =  File.expand_path("../../dummy/public/packs", __FILE__)

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
    return if !available?
    clear_webpacker_packs
    Dir.chdir("./test/dummy") do
      capture_io do
        Rake::Task['webpacker:compile'].reenable
        Rake::Task['webpacker:compile'].invoke
      end
    end
    # Reload cached JSON manifest:
    Webpacker::Manifest.load
  end

  def compile_if_missing
    if !File.exist?(PACKS_DIRECTORY)
      compile
    end
  end

  def clear_webpacker_packs
    FileUtils.rm_rf(PACKS_DIRECTORY)
  end
end
