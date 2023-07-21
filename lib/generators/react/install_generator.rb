# frozen_string_literal: true

module React
  module Generators
    class InstallGenerator < ::Rails::Generators::Base
      source_root File.expand_path "../templates", __dir__

      desc "Create default react.js folder layout and prep application.js"

      class_option :skip_git,
                   type: :boolean,
                   aliases: "-g",
                   default: false,
                   desc: "Skip Git keeps"

      class_option :skip_server_rendering,
                   type: :boolean,
                   default: false,
                   desc: "Don't generate server_rendering.js or config/initializers/react_server_rendering.rb"

      # Make an empty `components/` directory in the right place:
      def create_directory
        components_dir = if shakapacker?
                           Pathname.new(javascript_dir).parent.to_s
                         else
                           javascript_dir
                         end
        empty_directory File.join(components_dir, "components")
        return if options[:skip_git]

        create_file File.join(components_dir, "components/.keep")
      end

      # Add requires, setup UJS
      def setup_react
        if shakapacker?
          setup_react_shakapacker
        else
          setup_react_sprockets
        end
      end

      def create_server_rendering
        if options[:skip_server_rendering]
          nil
        elsif shakapacker?
          ssr_manifest_path = File.join(javascript_dir, "server_rendering.js")
          template("server_rendering_pack.js", ssr_manifest_path)
        else
          ssr_manifest_path = File.join(javascript_dir, "server_rendering.js")
          template("server_rendering.js", ssr_manifest_path)
          initializer_path = "config/initializers/react_server_rendering.rb"
          template("react_server_rendering.rb", initializer_path)
        end
      end

      private

      def shakapacker?
        !!defined?(Shakapacker)
      end

      def javascript_dir
        if shakapacker?
          shakapacker_source_path
            .relative_path_from(::Rails.root)
            .to_s
        else
          "app/assets/javascripts"
        end
      end

      def manifest
        Pathname.new(destination_root).join(javascript_dir, "application.js")
      end

      def setup_react_sprockets
        require_react = "//= require react\n//= require react_ujs\n//= require components\n"

        if manifest.exist?
          manifest_contents = File.read(manifest)

          if (match = manifest_contents.match(%r{//=\s+require\s+turbolinks\s+\n}))
            inject_into_file manifest, require_react, { after: match[0] }
          elsif (match = manifest_contents.match(%r{//=\s+require_tree[^\n]*}))
            inject_into_file manifest, require_react, { before: match[0] }
          else
            append_file manifest, require_react
          end
        else
          create_file manifest, require_react
        end

        components_js = "//= require_tree ./components\n"
        components_file = File.join(javascript_dir, "components.js")
        create_file components_file, components_js
      end

      SHAKAPACKER_SETUP_UJS = <<~JS
        // Support component names relative to this directory:
        var componentRequireContext = require.context("components", true);
        var ReactRailsUJS = require("react_ujs");
        ReactRailsUJS.useContext(componentRequireContext);
      JS

      def setup_react_shakapacker
        `yarn add react_ujs`
        if manifest.exist?
          append_file(manifest, SHAKAPACKER_SETUP_UJS)
        else
          create_file(manifest, SHAKAPACKER_SETUP_UJS)
        end
      end

      def shakapacker_source_path
        Shakapacker.config.source_entry_path
      end
    end
  end
end
