# == Schema Information
#
# Table name: reviews
#
#  id                :bigint           not null, primary key
#  company_id        :bigint
#  user_id           :bigint
#  rating            :integer          not null
#  current_employee  :boolean          default(FALSE)
#  former_employee   :boolean          default(FALSE)
#  employment_status :string           not null
#  job_title         :string
#  headline          :string           not null
#  pros              :text             not null
#  cons              :text             not null
#  advice            :text
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class Review < ApplicationRecord
    validates :rating, :employment_status, :headline, :pros, :cons, presence: true
    validates :company_id, uniqueness: {scope: :user_id, message: 'can only be reviewed once.'}
    validates :rating, numericality: {in: 1..5}
    validates :pros, length: {minimum: 20, message: 'pros must be at least 20 characters long' }
    validates :pros, length: {minimum: 20, message: 'cons must be at least 20 characters long'}


    belongs_to :company

    belongs_to :user
end
