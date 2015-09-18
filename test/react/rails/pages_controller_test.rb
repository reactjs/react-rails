require 'test_helper'

class PagesControllerTest < ActionController::TestCase
  test 'should not raise react_component undefined in ActionController::TestCase' do
    get :show, id: 1
    assert_not_raised ActionView::Template::Error
  end
end
