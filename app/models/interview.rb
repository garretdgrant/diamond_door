# == Schema Information
#
# Table name: interviews
#
#  id          :bigint           not null, primary key
#  company_id  :bigint
#  user_id     :bigint
#  title       :string           not null
#  offer       :boolean          default(FALSE)
#  accepted    :boolean          default(FALSE)
#  experience  :boolean          default(TRUE)
#  difficulty  :string           not null
#  application :text             not null
#  interview   :text             not null
#  questions   :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Interview < ApplicationRecord
end
