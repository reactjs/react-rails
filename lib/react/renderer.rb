require 'connection_pool'

module React
  class Renderer

    cattr_accessor :pool

    def self.setup!(react_js, components_js, args={})
      args.assert_valid_keys(:size, :timeout)
      @@react_js = react_js
      @@components_js = components_js
      @@pool.shutdown{} if @@pool
      @@pool = ConnectionPool.new(:size => args[:size]||10, :timeout => args[:timeout]||20) { self.new }
    end

    def self.render(component, args={})
      @@pool.with do |renderer|
        renderer.render(component, args)
      end
    end

    def self.combined_js
      @@combined_js ||= <<-CODE
        var global = global || this;

        var console = global.console || {};
        ['error', 'log', 'info', 'warn'].forEach(function (fn) {
          if (!(fn in console)) {
            console[fn] = function () {};
          }
        });

        #{@@react_js};
        React = global.React;
        #{@@components_js};
      CODE
    end

    def context
      @context ||= ExecJS.compile(self.class.combined_js)
    end

    def render(component, args={})
      jscode = <<-JS
        function() {
          return React.renderComponentToString(#{component}(#{args.to_json}));
        }()
      JS
      context.eval(jscode).html_safe
    # What should be done here? If we are server rendering, and encounter an error in the JS code,
    # then log it and continue, which will just render the react ujs tag, and when the browser tries
    # to render the component it will most likely encounter the same error and throw to the browser
    # console for a better debugging experience.
    rescue ExecJS::ProgramError => e
      ::Rails.logger.error "[React::Renderer] #{e.message}"
    end

  end
end
