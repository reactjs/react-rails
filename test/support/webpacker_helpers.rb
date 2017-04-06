module WebpackerHelpers
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

  def clear_webpacker_packs
    packs_directory = File.expand_path("../dummy/public/packs", __FILE__)
    FileUtils.rm_rf(packs_directory)
  end
end
