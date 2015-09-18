require 'test_helper'

class PagesControllerTest < ActionController::TestCase
  test 'renders successfully' do
    get :show, id: 1
    assert_equal(200, response.status)
  end
end
