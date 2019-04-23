module React
  module Rails
    module TestHelper
      extend ActiveSupport::Concern

      # assert react_component render
      #
      # assert_react_component("HelloWorld") do |props|
      #   assert_equal "Hello world", props[:message]
      # end
      def assert_react_component(name)
        assert_select "div[data-react-class=?]", name do |dom|
          if block_given?
            props = JSON.parse(dom.attr("data-react-props"))
            props.deep_symbolize_keys!

            yield(props)
          end
        end
      end
    end
  end
end