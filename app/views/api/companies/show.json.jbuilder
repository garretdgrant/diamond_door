json.company do
    json.extract! @company, :id, :name, :about , :website, :size, :revenue, :headquarters, :founded, :industry
    if @company.logo.attached? 
        json.photo_url @company.logo.url
    end 
end


json.reviews do 
    @company.reviews.each do |review|
        json.set! review.id do
            json.extract! review, :id, :job_title, :company_id, :user_id, :rating,:current_employee, :former_employee,
            :employment_status, :headline, :pros, :cons, :advice
        end
    end
end

json.interviews do 
    @company.interviews.each do |interview|
        json.set! interview.id do
            json.extract! interview, :id, :title, :company_id, :user_id, :experience, :process, :difficulty, :offer, 
            :questions, :answer, :created_at
        end
    end
end
