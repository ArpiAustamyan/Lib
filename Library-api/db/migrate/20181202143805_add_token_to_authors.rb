class AddTokenToAuthors < ActiveRecord::Migration[5.2]
  def change
    add_column :authors, :token, :string
  end
end
