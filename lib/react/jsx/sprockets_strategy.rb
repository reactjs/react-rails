module React
  module JSX
    # Depending on the Sprockets version,
    # attach JSX transformation the the Sprockets environment.
    #
    # You can override it with `config.sprockets_strategy`
    # @example Specifying a Sprockets strategy
    #   app.config.react.sprockets_strategy = :register_engine
    #
    # @example Opting out of any Sprockets strategy
    #   app.config.react.sprockets_strategy = false
    #
    module SprocketsStrategy
      module_function

      # @param [Sprockets::Environment] the environment to attach JSX to
      # @param [Symbol, Nil] A strategy name, or `nil` to detect a strategy
      def attach_with_strategy(sprockets_env, strategy_or_nil)
        strategy = strategy_or_nil || detect_strategy
        self.public_send(strategy, sprockets_env)
      end

      # @return [Symbol] based on the environment, return a method name to call with the sprockets environment
      def detect_strategy
        sprockets_version = Gem::Version.new(Sprockets::VERSION)
        if sprockets_version >= Gem::Version.new('4.x')
          :register_processors
        elsif sprockets_version >= Gem::Version.new('3.0.0')
          :register_engine_with_mime_type
        else
          :register_engine
        end
      end

      def register_engine(sprockets_env)
        sprockets_env.register_engine('.jsx', React::JSX::Template)
      end

      def register_engine_with_mime_type(sprockets_env)
        sprockets_env.register_engine('.jsx', React::JSX::Processor, mime_type: 'application/javascript', silence_deprecation: true)
      end

      def register_processors(sprockets_env)
        sprockets_env.register_mime_type('application/jsx', extensions: ['.jsx', '.js.jsx', '.es.jsx', '.es6.jsx'])
        sprockets_env.register_mime_type('application/jsx+coffee', extensions: ['.jsx.coffee', '.js.jsx.coffee'])
        sprockets_env.register_transformer('application/jsx', 'application/javascript', React::JSX::Processor)
        sprockets_env.register_transformer('application/jsx+coffee', 'application/jsx', Sprockets::CoffeeScriptProcessor)
        sprockets_env.register_preprocessor('application/jsx', Sprockets::DirectiveProcessor.new(comments: ['//', ['/*', '*/']]))
        sprockets_env.register_preprocessor('application/jsx+coffee', Sprockets::DirectiveProcessor.new(comments: ['#', ['###', '###']]))
      end
    end
  end
end
