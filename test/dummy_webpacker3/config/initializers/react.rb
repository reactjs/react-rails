# Override setting set in application.rb
class CustomComponentMount < React::Rails::ComponentMount
end

Dummy::Application.configure do
  config.react.view_helper_implementation = CustomComponentMount
  # Add "app/pants" to the array we can test that file watchers are setup after
  # rails initializers are loaded
  config.react.server_renderer_directories = ["/app/assets/javascripts/",
                                              "app/javascript",
                                              "app/pants"]
end

