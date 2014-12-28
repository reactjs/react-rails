Dummy::Application.routes.draw do
  resources :pages, :only => [:show]
  resources :server, :only => [:show]
  resources :helper, :only => [:show]
end
