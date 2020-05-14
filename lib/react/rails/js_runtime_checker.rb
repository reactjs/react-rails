module React
  module Rails
    module JsRuntimeChecker
      module_function
      def call(minimum_supported_node_version = 6)
        node_version = ExecJS.runtime.eval('process.versions')['node']
        node_major_version = node_version.split('.').first.to_i

        if node_major_version < minimum_supported_node_version
          warning = <<~WARNING
            You are using node #{node_version}.
            This an unsupported JavaScript runtime.
            Please upgrade your node version to one >=#{minimum_supported_node_version}.
            For more information see this issue https://git.io/fxXgI
          WARNING

          ActiveSupport::Deprecation.warn(warning)
        end
      end

    end
  end
end
