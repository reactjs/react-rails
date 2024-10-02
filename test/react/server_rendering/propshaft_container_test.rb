# frozen_string_literal: true

require "test_helper"
require "open-uri"

class PropshaftContainerTest < ActiveSupport::TestCase
  PropshaftHelpers.when_propshaft_available do
    def test_it_loads_js_from_the_propshaft_container
      container = React::ServerRendering::PropshaftContainer.new

      assert_not_empty container.find_asset("server_rendering.js")
    end
  end
end
