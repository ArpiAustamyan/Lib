class CreateAuthors < ActiveRecord::Migration[5.2]
  def change
    create_table :authors do |t|
      t.string :name
      t.string :surname
      t.integer :birthyear
      t.string :email
      t.string :password_digest

      t.timestamps
    end
  end
end
