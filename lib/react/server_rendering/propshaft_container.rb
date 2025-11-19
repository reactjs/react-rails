# frozen_string_literal: true

module React
  module ServerRendering
    # Return asset contents by getting them from a Propshaft::Assembly instance.
    class PropshaftContainer
      class << self
        def assembly
          ::Rails.application.assets
        end

        def compatible?
          !!defined?(Propshaft) && assembly.is_a?(Propshaft::Assembly)
        end
      end

      def find_asset(path)
        self.class.assembly.load_path.find(path).content.force_encoding("utf-8")
      end
    end
  end
end
