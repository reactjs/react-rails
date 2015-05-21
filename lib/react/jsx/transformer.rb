module React
  module JSX
    class Transformer
      DEFAULT_ASSET_PATH = 'JSXTransformer.js'

      def initialize(options)
        @strip_types =  options.fetch(:strip_types, false)
        @harmony =      options.fetch(:harmony, false)
        @asset_path =    options.fetch(:asset_path, DEFAULT_ASSET_PATH)

        # If execjs uses therubyracer, there is no 'global'. Make sure
        # we have it so JSX script can work properly.
        js_code = 'var global = global || this;' + jsx_transform_code
        @context = ExecJS.compile(js_code)
      end


      def transform(code)
        result = @context.call('JSXTransformer.transform', code, {stripTypes: @strip_types, harmony: @harmony})
        result["code"]
      end

      def jsx_transform_code
        # search for transformer file using sprockets - allows user to override
        # this file in his own application
        ::Rails.application.assets[@asset_path].to_s
      end
    end
  end
end