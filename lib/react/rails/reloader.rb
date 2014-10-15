require 'rails'

module React
  module Rails

    class Reloader
      def self.on_change(watch_files, &block)
        unless block_given?
          warn "Reloader.on_change requires a callback block"
        end

        @@file_checker = ActiveSupport::FileUpdateChecker.new(watch_files, &block)
      end

      def initialize(app)
        @app = app
      end

      def call(env)
        execute_if_updated!
        @app.call(env)
      end

      private

      def execute_if_updated!
        @@file_checker.execute_if_updated if @@file_checker
      end
    end

  end
end
