class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false, index: {unique: true}
      t.string :first_name, null: false
      t.string :last_name , null: false
      t.string :website
      t.bigint :phone
      t.text :about_me
      t.string :job_title, null: false
      t.text :skills
      t.string :password_digest, null: false
      t.string :session_token, null: false, index: {unique: true}

      t.timestamps
    end
  end
end
