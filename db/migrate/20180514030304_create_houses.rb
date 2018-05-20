class CreateHouses < ActiveRecord::Migration[5.1]
  def change
    create_table :houses do |t|
      t.float :latitude
      t.float :longitude
      t.string :title
      t.float :price
      t.integer  :size
      t.string :description
      t.integer :house_type 
      t.string :address    
      t.timestamps
    end
  end
end
