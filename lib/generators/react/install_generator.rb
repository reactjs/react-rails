module React
  module Generators
    class InstallGenerator < ::Rails::Generators::Base
      source_root File.expand_path '../../templates', __FILE__

      desc 'Create default react.js folder layout and prep application.js'

      class_option :skip_git,
        type: :boolean,
        aliases: '-g',
        default: false,
        desc: 'Skip Git keeps'

      class_option :skip_server_rendering,
        type: :boolean,
        default: false,
        desc: "Don't generate server_rendering.js or config/initializers/react_server_rendering.rb"

      # For Shakapacker below version 7, we need to set relative path for source_entry_path
      def modify_webpacker_yml
        webpacker_yml_path = 'config/webpacker.yml'
        if webpacker? && Pathname.new(webpacker_yml_path).exist?
          gsub_file(
            webpacker_yml_path,
            "source_entry_path: /\n",
            "source_entry_path: packs\n"
          )
          reloaded_webpacker_config
        end
      end

      # Make an empty `components/` directory in the right place:
      def create_directory
        components_dir = if webpacker?
          Pathname.new(javascript_dir).parent.to_s
        else
          javascript_dir
        end
        empty_directory File.join(components_dir, 'components')
        unless options[:skip_git]
          create_file File.join(components_dir, 'components/.keep')
        end
      end

      # Add requires, setup UJS
      def setup_react
        if webpacker?
          setup_react_webpacker
        else
          setup_react_sprockets
        end
      end

      def create_server_rendering
        if options[:skip_server_rendering]
          return
        elsif webpacker?
          ssr_manifest_path = File.join(javascript_dir, 'server_rendering.js')
          template('server_rendering_pack.js', ssr_manifest_path)
        else
          ssr_manifest_path = File.join(javascript_dir, 'server_rendering.js')
          template('server_rendering.js', ssr_manifest_path)
          initializer_path = 'config/initializers/react_server_rendering.rb'
          template('react_server_rendering.rb', initializer_path)
        end
      end

      private

      def webpacker?
        !!defined?(Webpacker)
      end

      def javascript_dir
        if webpacker?
          webpack_source_path
            .relative_path_from(::Rails.root)
            .to_s
        else
          'app/assets/javascripts'
        end
      end

      def manifest
        Pathname.new(destination_root).join(javascript_dir, 'application.js')
      end

      def setup_react_sprockets
        require_react = "//= require react\n//= require react_ujs\n//= require components\n"

        if manifest.exist?
          manifest_contents = File.read(manifest)

          if match = manifest_contents.match(/\/\/=\s+require\s+turbolinks\s+\n/)
            inject_into_file manifest, require_react, { after: match[0] }
          elsif match = manifest_contents.match(/\/\/=\s+require_tree[^\n]*/)
            inject_into_file manifest, require_react, { before: match[0] }
          else
            append_file manifest, require_react
          end
        else
          create_file manifest, require_react
        end

        components_js = "//= require_tree ./components\n"
        components_file = File.join(javascript_dir, 'components.js')
        create_file components_file, components_js
      end

      WEBPACKER_SETUP_UJS = <<-JS
// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
JS

      def setup_react_webpacker
        `yarn add react_ujs`
        if manifest.exist?
          append_file(manifest, WEBPACKER_SETUP_UJS)
        else
          create_file(manifest, WEBPACKER_SETUP_UJS)
        end
      end

      private

      def webpack_source_path
        if Webpacker.respond_to?(:config)
          Webpacker.config.source_entry_path # Webpacker >3
        else
          Webpacker::Configuration.source_path.join(Webpacker::Configuration.entry_path) # Webpacker <3
        end
      end

      def reloaded_webpacker_config
        Webpacker.instance.instance_variable_set(:@config, nil)
        Webpacker.config
      end
    end
  end
end
