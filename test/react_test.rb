require 'test_helper'
require 'fileutils'

class ReactTest < ActionDispatch::IntegrationTest
  setup do
    Rails.application.assets.send(:expire_index!)
    FileUtils.rm_r(CACHE_PATH) if CACHE_PATH.exist?
  end

  test 'asset pipeline should deliver drop-in react file replacement' do
    app_react_file_path = File.expand_path("../dummy/vendor/assets/javascripts/react.js",  __FILE__)

    react_file_token = "'test_confirmation_token_react_content_non_production';\n";
    File.write(app_react_file_path, react_file_token)

    asset_pipeline_length = Rails.application.assets.find_asset('react').to_s.length
    get '/assets/react.js'

    File.unlink(app_react_file_path)
    FileUtils.rm_r CACHE_PATH if CACHE_PATH.exist?

    assert_response :success
    assert_equal react_file_token.length, asset_pipeline_length, "The asset pipeline serves the drop-in file"
    assert_equal react_file_token.length, @response.body.length, "The asset route serves the drop-in file"
  end

  test 'precompiling assets works' do
    begin
      ENV['RAILS_GROUPS'] = 'assets' # required for Rails 3.2
      Dummy::Application.load_tasks
      Rake::Task['assets:precompile'].invoke
      FileUtils.rm_r(File.expand_path("../dummy/public/assets", __FILE__))
    ensure
      ENV.delete('RAILS_GROUPS')
    end
  end

  test "the development version is loaded" do
    asset = Rails.application.assets.find_asset('react')
    assert asset.pathname.to_s.end_with?('development/react.js')
  end
end
