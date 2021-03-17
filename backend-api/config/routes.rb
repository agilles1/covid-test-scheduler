Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :appointments, only: [:index, :update]
  resources :test_times, only: [:index]
  resources :patients, only: [:index]
end
