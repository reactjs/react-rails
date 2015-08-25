module React
  module Rails
    class Engine < ::Rails::Engine
      initializer "react_rails.setup_engine", :group => :all do |app|
        sprockets_env = app.assets || Sprockets # Sprockets 3.x expects this in a different place
        sprockets_env.register_engine(".jsx", React::JSX::Template)
      end

      initializer 'react_rails.assets.precompile' do |app|
        precompile = File.join("components", '*.ssr.js')
        app.config.assets.precompile += [precompile]
      end
    end
  end
end
