require 'test_helper'
class ReactTest < ActionDispatch::IntegrationTest
  setup do
    FileUtils.rm_r(CACHE_PATH) if CACHE_PATH.exist?

  end

  teardown do
    FileUtils.rm_r(CACHE_PATH) if CACHE_PATH.exist?
  end

  test 'asset pipeline should deliver drop-in react file replacement' do
    app_react_file_path = File.expand_path("../dummy/vendor/assets/javascripts/react.js",  __FILE__)
    react_file_token = "'test_confirmation_token_react_content_non_production';\n"
    File.write(app_react_file_path, react_file_token)

    react_asset = Rails.application.assets['react.js']

    # Sprockets 2 doesn't expire this asset correctly,
    # so override `fresh?` to mark it as expired.
    def react_asset.fresh?(env); false; end

    react_asset = Rails.application.assets['react.js']

    get '/assets/react.js'

    File.unlink(app_react_file_path)
    FileUtils.rm_r(CACHE_PATH) if CACHE_PATH.exist?

    assert_response :success
    assert_equal react_file_token.length, react_asset.to_s.length, "The asset pipeline serves the drop-in file"
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
