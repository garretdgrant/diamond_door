# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  first_name          :string           not null
#  last_name          :string           not null
#  website         :string
#  about_me        :text
#  job_title       :string           not null
#  skills          :text
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  phone           :string
#
class User < ApplicationRecord
    has_secure_password
    before_validation :ensure_session_token

    validates :email, :first_name, :last_name, :job_title, :password_digest, :session_token, 
        presence: true
    validates :email, length: {in: 3..255}, 
        format: {with: URI::MailTo::EMAIL_REGEXP, message: 'must be a valid email'}, uniqueness: true
    validates :first_name, :last_name, :job_title, length: {message: 'must be between 3 and 20 characters', in: 3..20}
    validates :password, allow_nil: true, length:{in: 6..255}
    validates :session_token, uniqueness: true

    has_many :reviews, dependent: :destroy
    has_many :interviews, dependent: :destroy
    has_many :follows, dependent: :destroy

    def self.find_by_credentials(email, password) 
        User.find_by(email: email)&.authenticate(password)
    end

    def reset_session_token!
        self.update!({session_token: generate_unique_token })
        self.session_token
    end

    private
    def generate_unique_token
        while true 
            token = SecureRandom::base64
            return token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_token
    end

end
