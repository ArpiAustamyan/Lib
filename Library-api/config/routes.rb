Rails.application.routes.draw do
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
  resources :books
  resources :authors
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
