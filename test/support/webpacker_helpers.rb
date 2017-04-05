module WebpackerHelpers
  module_function
  def available?
    defined?(Webpacker)
  end

  def when_webpacker_available
    if available?
      clear_webpacker_packs
      Dir.chdir("./test/dummy") do
        Rake::Task['webpacker:compile'].invoke
      end
      # Reload cached JSON manifest:
      Webpacker::Manifest.load
      yield
    end
  end

  def clear_webpacker_packs
    packs_directory = File.expand_path("../dummy/public/packs", __FILE__)
    FileUtils.rm_rf(packs_directory)
  end
end
