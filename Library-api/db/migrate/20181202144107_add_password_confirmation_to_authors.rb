class AddPasswordConfirmationToAuthors < ActiveRecord::Migration[5.2]
  def change
    add_column :authors, :password_confirmation, :string, limit: 20
  end
end
