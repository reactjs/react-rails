Dummy::Application.routes.draw do
  resources :pages, only: [:show]
  resources :server, only: [:show] do
    collection do
      get :console_example
      get :console_example_suppressed
      get :inline_component_prerender_true
      get :inline_component_prerender_false
    end
  end
end
