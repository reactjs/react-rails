module React
  module JSX
    # A {React::JSX}-compliant transformer which uses the deprecated `JSXTransformer.js` to transform JSX.
    class JSXTransformer
      DEFAULT_ASSET_PATH = 'JSXTransformer.js'

      def initialize(options)
        @transform_options = {
          stripTypes: options.fetch(:strip_types, false),
          harmony:    options.fetch(:harmony, false)
        }

        @asset_path = options.fetch(:asset_path, DEFAULT_ASSET_PATH)

        # If execjs uses therubyracer, there is no 'global'. Make sure
        # we have it so JSX script can work properly.
        js_code = 'var global = global || this;' + jsx_transform_code
        @context = ExecJS.compile(js_code)
      end

      def transform(code)
        result = @context.call('JSXTransformer.transform', code, @transform_options)
        result['code']
      end

      # search for transformer file using sprockets - allows user to override
      # this file in their own application
      def jsx_transform_code
        ::Rails.application.assets[@asset_path].to_s
      end
    end
  end
end
