require 'babel/transpiler'
module React
  module JSX
    # A {React::JSX}-compliant transformer which uses `Babel::Transpiler` to transform JSX.
    class BabelTransformer
      DEFAULT_TRANSFORM_OPTIONS = { blacklist: ['spec.functionName', 'validation.react', 'strict'] }

      def initialize(noop)
      end

      def transform(code, local_options = {})
        options = DEFAULT_TRANSFORM_OPTIONS.merge(local_options)
        Babel::Transpiler.transform(code, options)['code']
      end
    end
  end
end
