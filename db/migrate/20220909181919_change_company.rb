class ChangeCompany < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :size, :string
    add_column :companies, :revenue, :string
    add_column :companies, :headquarters, :string
    add_column :companies, :founded, :string
    add_column :companies, :industry, :string 
  end
end
