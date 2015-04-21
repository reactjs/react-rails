module React
  module Rails
    class Engine < ::Rails::Engine
      initializer "react_rails.setup_engine", group: :all do |app|
        Sprockets.register_engine '.jsx', React::JSX::Template
      end
    end
  end
end
