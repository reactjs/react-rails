module React
  module Rails
    module ViewHelper
      # Render a react component named +name+. Returns a HTML tag and some
      # javascript to render the component. The HTML tag is +div+ by default and
      # can be changed by +options[:tag]+. If +options[:tag]+ is a symbol, use
      # it as +options[:tag]+. HTML attributes can be specified by +options+.
      # The javascript will encode +args+ to JSON and use it to construct the
      # component. Use a block to render child elements, be aware that they will
      # be replaced once the javascript gets executed.
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
        html_tag, html_options = *react_parse_options(options)

        result = content_tag(html_tag, '', html_options, &block)
        result << react_javascript_tag(name, args, html_options[:id])
      end

      private

        # Returns +[html_tag, html_options]+.
        def react_parse_options(options)
          # Syntactic sugar for specifying html tag.
          return [options, {:id => SecureRandom::hex}] if options.is_a?(Symbol)

          # Assign a random id if missing.
          options = options.reverse_merge(:id => SecureRandom::hex)

          # Use <div> by default.
          tag = options[:tag] || :div
          options.delete(:tag)

          [tag, options]
        end

        def react_javascript_tag(name, args, element_id)
          @@react_javascript_template ||= build_react_javascript_template

          javascript_tag(@@react_javascript_template % {
            :element_id => element_id,
            :name => name,
            :args => args.to_json,
          })
        end

        def build_react_javascript_template
          load_events = [%w[document DOMContentLoaded]]
          unload_events = [%w[window unload]]
          if defined?(::Turbolinks)
            load_events << %w[document page:load]
            unload_events << %w[document page:before-change]
          end

          # Minify javascript by removing spaces.
          <<-"!".gsub(/(var\s)|(?:\s+)/, '\1')
            (function() {
              var e = document.getElementById('%{element_id}'),
              f = function() {
                e && React.renderComponent(%{name}(%{args}), e);
                #{load_events.map {|e| "#{e[0]}.removeEventListener('#{e[1]}', f)"} * ';'}
              },
              g = function() {
                e && React.unmountComponentAtNode(e);
                #{unload_events.map {|e| "#{e[0]}.removeEventListener('#{e[1]}', g)"} * ';'}
              };
              #{load_events.map {|e| "#{e[0]}.addEventListener('#{e[1]}', f)"} * ';'};
              #{unload_events.map {|e| "#{e[0]}.addEventListener('#{e[1]}', g)"} * ';'}
            })()
          !
        end
    end
  end
end

ActionView::Base.class_eval do
  include ::React::Rails::ViewHelper
end
