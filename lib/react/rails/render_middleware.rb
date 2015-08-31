module React
  module Rails
    class RenderMiddleware
      HELPER_IMPLEMENTATION_KEY = "react_rails.view_helper_implementation"
      def initialize(app)
        @app = app
      end

      def call(env)
        new_helper = React::Rails::ViewHelper.helper_implementation_class.new
        new_helper.setup(env)
        env[HELPER_IMPLEMENTATION_KEY] = new_helper
        response = @app.call(env)
        new_helper.teardown(env)
        response
      end
    end
  end
end
