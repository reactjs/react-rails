module React
  module Generators
    class UjsGenerator < ::Rails::Generators::Base
      desc "Create a custom copy of react_ujs for your application"

      class_option :output, required: true, desc: "File path for new react_ujs.js"

      class_option :turbolinks, type: :boolean, default: true, desc: "Include Turbolinks 5 support?"
      class_option :turbolinks_classic, type: :boolean, default: true, desc: "Include Turbolinks 2.4 / 3 support?"
      class_option :turbolinks_classic_deprecated, type: :boolean, default: true, desc: "Include Turbolinks < 2.4 support?"
      class_option :pjax, type: :boolean, default: true, desc: "Include PJAX support?"
      class_option :native, type: :boolean, default: true, desc: "Include native events support?"

      EVENT_SUPPORT_OPTIONS = [
        :turbolinks,
        :turbolinks_classic,
        :turbolinks_classic_deprecated,
        :pjax,
        :native,
      ]

      def create_ujs_file
        files_to_merge = ["react_ujs_mount.js"]

        EVENT_SUPPORT_OPTIONS.each do |event_support_option|
          if options[event_support_option]
            files_to_merge << "react_ujs_#{event_support_option}.js"
          end
        end

        files_to_merge << "react_ujs_event_setup.js"

        asset_dir = File.expand_path("../../../assets/javascripts", __FILE__)

        custom_ujs_content = files_to_merge
          .map { |filename| File.read(File.join(asset_dir, filename)) }
          .join("\n")

        new_ujs_path = options[:output]
        create_file(new_ujs_path, custom_ujs_content)
      end
    end
  end
end
