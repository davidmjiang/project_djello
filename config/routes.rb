Rails.application.routes.draw do
  devise_for :users
  get 'static_pages/index'
  root to: 'static_pages#index'

  scope :api do
  	scope :v1 do
  		resources :boards
  		resources :lists
      get 'cards/members', to: 'cards#members'
      resources :cards
      get 'users/boards', to: 'users#boards'
      resources :users
      delete '/memberships', to: 'memberships#destroy'
      resources :memberships
      resources :activities
  	end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
