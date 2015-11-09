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

      def create_directory
        empty_directory 'app/assets/javascripts/components'
        create_file 'app/assets/javascripts/components/.gitkeep' unless options[:skip_git]
      end

      def inject_react
        require_react = "//= require react\n"

        if manifest.exist?
          manifest_contents = File.read(manifest)

          if manifest_contents.include? 'require turbolinks'
            inject_into_file manifest, require_react, {after: "//= require turbolinks\n"}
          elsif manifest_contents.include? 'require_tree'
            require_tree = manifest_contents.match(/\/\/= require_tree[^\n]*/)[0]
            inject_into_file manifest, require_react, {before: require_tree}
          else
            append_file manifest, require_react
          end
        else
          create_file manifest, require_react
        end
      end

      def inject_components
        inject_into_file manifest, "//= require components\n", {after: "//= require react\n"}
      end

      def inject_react_ujs
        inject_into_file manifest, "//= require react_ujs\n", {after: "//= require react\n"}
      end

      def create_components
        components_js = "//= require_tree ./components\n"
        components_file = File.join(*%w(app assets javascripts components.js))
        create_file components_file, components_js
      end

      private

      def manifest
        Pathname.new(destination_root).join('app/assets/javascripts', 'application.js')
      end
    end
  end
end
