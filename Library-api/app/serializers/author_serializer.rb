class AuthorSerializer < ActiveModel::Serializer
  has_many :books
  attributes :id, :name, :surname, :email, :birthyear, :books
end
