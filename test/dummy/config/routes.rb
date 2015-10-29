Dummy::Application.routes.draw do
  resources :pages, only: [:show]
  resources :server, only: [:show] do
    collection do
      get :console_example
      get :console_example_suppressed
      get :exec_js_renderer
      get :inline_component
    end
  end
end
