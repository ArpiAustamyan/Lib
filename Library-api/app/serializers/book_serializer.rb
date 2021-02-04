class BookSerializer < ActiveModel::Serializer
  belongs_to :author
  attributes :id, :title, :year, :description, :rating, :genre, :author
end
