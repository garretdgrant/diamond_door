class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :company, foreign_key: {to_table: :companies}
      t.references :user, foreign_key: true
      t.integer :rating, null: false
      t.boolean :current_employee, default: false
      t.boolean :former_employee, default: false
      t.string :employment_status, null: false
      t.string :job_title
      t.string :headline, null: false
      t.text :pros, null: false
      t.text :cons, null: false
      t.text :advice


      t.timestamps
    end
    add_index :reviews, [:company_id, :user_id], unique: true
  end
end
