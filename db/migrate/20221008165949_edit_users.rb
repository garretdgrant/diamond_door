class EditUsers < ActiveRecord::Migration[7.0]
  def change
    # rename_column :users, :f_name, :first_name
    rename_column :users, :l_name, :last_name
  end
end
