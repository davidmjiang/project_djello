Rails.application.routes.draw do
  devise_for :users
  get 'static_pages/index'
  root to: 'static_pages#index'

  scope :api do
  	scope :v1 do
  		resources :boards
  		resources :lists
  	end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
