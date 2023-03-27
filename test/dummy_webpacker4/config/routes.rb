Dummy::Application.routes.draw do
  resources :pages, only: [:show]
  resources :server, only: [:show] do
    collection do
      get :console_example
      get :inline_component_prerender_true
      get :inline_component_prerender_false
      get :inline_component_with_camelize_props_prerender_true
      get :inline_component_with_camelize_props_prerender_false
    end
  end

  resource :pack_component, only: :show
end
