class CreateInterviews < ActiveRecord::Migration[7.0]
  def change
    create_table :interviews do |t|
      t.references :company, foreign_key: {to_table: :companies}
      t.references :user, foreign_key: true
      t.string :title, null: false
      t.boolean :offer, default: false
      t.boolean :accepted, default: false
      t.boolean :experience, default: true
      t.string :difficulty, null: false
      t.text :application, null: false
      t.text :interview, null: false
      t.text :questions, null: false


      t.timestamps
    end
  end
end
