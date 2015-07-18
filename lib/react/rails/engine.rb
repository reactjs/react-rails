module React
  module Rails
    class Engine < ::Rails::Engine
      initializer "react_rails.setup_engine", :group => :all do |app|
        if app.assets.nil?
         app.config.assets.register_engine '.jsx', React::JSX::Template
        else
          app.assets.register_engine '.jsx', React::JSX::Template
        end
      end
    end
  end
end
