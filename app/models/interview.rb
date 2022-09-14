# == Schema Information
#
# Table name: interviews
#
#  id         :bigint           not null, primary key
#  company_id :bigint
#  user_id    :bigint
#  experience :string           not null
#  title      :string           not null
#  process    :text             not null
#  difficulty :string           not null
#  offer      :string           not null
#  questions  :text             not null
#  answer     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Interview < ApplicationRecord
    validates :title, :experience, :process, :difficulty, :offer,  :questions,
        presence: true

    validates :title, length: {minimum: 5}
    validates :process, :questions, length: {minimum: 20}

    belongs_to :company

    belongs_to :user
end
