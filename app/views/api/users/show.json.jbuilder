json.user do
    json.extract! @user, :id, :email,:phone, :first_name,
        :last_name,:website, :about_me, :job_title, :skills, :created_at, :updated_at
end

json.follows do 
    @user.follows.each do |follow|
        json.set! follow.id do
            json.extract! follow, :id, :company_id, :user_id, :created_at
        end
    end
end