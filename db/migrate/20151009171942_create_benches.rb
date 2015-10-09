class CreateBenches < ActiveRecord::Migration
  def change
    create_table :benches do |t|
      t.string :description, presence: true
      t.float :lat, presence: true
      t.float :lng, presence: true

      t.timestamps null: false
    end
  end
end
