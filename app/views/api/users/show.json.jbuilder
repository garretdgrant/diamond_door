json.user do
    json.extract! @user, :id, :email,:phone, :f_name,
        :l_name,:website, :about_me, :job_title, :skills, :created_at, :updated_at
end