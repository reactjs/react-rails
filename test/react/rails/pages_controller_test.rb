require 'test_helper'

class PagesControllerTest < ActionController::TestCase
  include ParamsHelper
  setup do
    WebpackerHelpers.compile_if_missing
  end

  test 'renders successfully' do
    get :show, query_params(id: 1)
    assert_equal(200, response.status)
  end

  when_stateful_js_context_available do
    test 'it sets up and tears down a react context' do
      get :show, params: { id: 1, prerender: true }
      assert_includes(response.body, 'Hello')

      get :show, params: { id: 1, prerender: true, greeting: 'Howdy' }
      assert_includes(response.body, 'Howdy')

      get :show, params: { id: 1, prerender: true, greeting: '👋' }
      assert_includes(response.body, '👋')

      get :show, params: { id: 1, prerender: true }
      assert_includes(response.body, 'Hello')
    end
  end

  WebpackerHelpers.when_webpacker_available do
    test 'it mounts components from the dev server' do
      WebpackerHelpers.with_dev_server do
        get :show, params: { id: 1, prerender: true }
        assert_match /Hello<!--.*--> from Webpacker/, response.body
        get :show, params: { id: 1, prerender: true, greeting: 'Howdy' }
        assert_match /Howdy<!--.*--> from Webpacker/, response.body
      end
    end
  end
end
