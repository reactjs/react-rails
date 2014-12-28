require 'test_helper'
require 'support/setup_capybara'

class ControllerHelperTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  setup do
    @helper = ActionView::Base.new.extend(React::Rails::ViewHelper)
    Capybara.current_driver = Capybara.javascript_driver
  end

  test 'uses a custom layout and status' do
    get 'helper/1'

    assert response.status == 218
    assert response.body.include?('This is a different layout')
  end

  test 'renders the React component' do
    get 'helper/1'

    %w(data-react-class="Foo" data-react-props="{&quot;bar&quot;:&quot;value&quot;}").each do |segment|
      assert response.body.include?(segment)
    end
  end
end
