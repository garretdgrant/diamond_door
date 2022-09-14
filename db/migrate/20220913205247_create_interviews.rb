class CreateInterviews < ActiveRecord::Migration[7.0]
  def change
    create_table :interviews do |t|
      t.references :company, foreign_key: {to_table: :companies}
      t.references :user, foreign_key: true
      t.string :experience, null: false
      t.string :title, null: false
      t.text :process, null: false
      t.string :difficulty, null: false
      t.string :offer, null: false
      t.text :questions, null: false
      t.text :answer
     


      t.timestamps
    end
  end
end
