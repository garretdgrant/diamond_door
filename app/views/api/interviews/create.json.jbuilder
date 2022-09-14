json.interview do
    json.extract! @interview, :id, :title, :company_id, :user_id, :experience, :process, :difficulty, :offer, 
    :questions, :answer, :created_at
end