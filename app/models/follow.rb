# == Schema Information
#
# Table name: follows
#
#  id           :bigint           not null, primary key
#  user_id      :bigint
#  company_id   :bigint
#  is_following :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Follow < ApplicationRecord
    belongs_to :company
    belongs_to :user
end
