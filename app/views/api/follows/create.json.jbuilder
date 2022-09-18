json.follow do 
    json.extract! @follow, :id, :company_id, :user_id, :is_following
end

