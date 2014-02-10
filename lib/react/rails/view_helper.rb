module React
  module Rails
    module ViewHelper
      # Render a react component named +name+. Returns a HTML tag and some
      # javascript to render the component.
      #
      # HTML attributes can be specified by +options+. The HTML tag is +div+
      # by default and can be changed by +options[:tag]+. If +options+ is a
      # symbol, use it as +options[:tag]+.
      #
      # Static child elements can be rendered by using a block. Be aware that
      # they will be replaced once javascript gets executed.
      #
      # ==== Examples
      #
      #   # // <HelloMessage> defined in a .jsx file:
      #   # var HelloMessage = React.createClass({
      #   #   render: function() {
      #   #     return <div>{'Hello ' + this.props.name}</div>;
      #   #   }
      #   # });
      #   react_component(:HelloMessage, :name => 'John')
      #
      #   # Use <span> instead of <div>:
      #   react_component(:HelloMessage, {:name => 'John'}, :span)
      #   react_component(:HelloMessage, {:name => 'John'}, :tag => :span)
      #
      #   # Add HTML attributes:
      #   react_component(:HelloMessage, {}, {:class => 'c', :id => 'i'})
      #
      #   # (ERB) Customize child elements:
      #   <%= react_component :HelloMessage do -%>
      #     Loading...
      #   <% end -%>
      def react_component(name, args = {}, options = {}, &block)
        options = {:tag => options} if options.is_a?(Symbol)

        html_options = options.reverse_merge(:data => {})
        html_options[:data].tap do |data|
          data[:react_class] = name
          data[:react_props] = args.to_json unless args.empty?
        end
        html_tag = html_options.delete(:tag) || :div

        content_tag(html_tag, '', html_options, &block)
      end
    end
  end
end

ActionView::Base.class_eval do
  include ::React::Rails::ViewHelper
end
