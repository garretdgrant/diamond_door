Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
    resources :companies, only: [:index, :show]
    resources :reviews, only: [:show, :update, :destroy, :create]
    resources :interviews, only: [:show, :create, :update, :destroy]
    resources :follows, only: [:create, :show, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"

end
