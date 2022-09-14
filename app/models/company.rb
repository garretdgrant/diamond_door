# == Schema Information
#
# Table name: companies
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  about        :string           not null
#  website      :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  size         :string
#  revenue      :string
#  headquarters :string
#  founded      :string
#  industry     :string
#
class Company < ApplicationRecord
    validates :name, :about, :website, presence: true
    validates :name, uniqueness: true
    has_one_attached :logo
    has_many :reviews
    has_many :interviews
    
end
