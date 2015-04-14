module React
  module Rails
    class Engine < ::Rails::Engine
      config.after_initialize do |app|
        app.assets.register_engine '.jsx', React::JSX::Template
      end
    end
  end
end
