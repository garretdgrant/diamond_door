class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.references :user, foreign_key: true
      t.references :company, foreign_key: true
      t.boolean :is_following, default: false
  
      t.timestamps
    end
    add_index :follows, [:user_id, :company_id], unique: true 
  end
end
