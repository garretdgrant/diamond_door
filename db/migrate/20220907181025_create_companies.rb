class CreateCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :companies do |t|
      t.string :name, null: false, index: {unique: true}
      t.string :about, null: false
      t.string :website, null: false
      t.timestamps
    end
  end
end
