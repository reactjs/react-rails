module React
  module Rails
    class Engine < ::Rails::Engine
      isolate_namespace React

      initializer "react_rails.setup_engine", :group => :all do |app|
        app.assets.register_engine '.jsx', React::JSX::Template
      end
    end
  end
end
