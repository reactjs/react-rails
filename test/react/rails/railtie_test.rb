require 'test_helper'

class RailtieTest < ActionDispatch::IntegrationTest
  test 'reloaders are configured after initializers are loaded' do
    @test_file = File.expand_path("../../#{DUMMY_LOCATION}/app/pants/yfronts.js", File.dirname(__FILE__))
    FileUtils.touch @test_file
    results = Dummy::Application.reloaders.map(&:updated?)
    assert_includes(results, true)
  end
end
