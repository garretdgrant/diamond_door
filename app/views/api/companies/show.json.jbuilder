json.company do
    json.extract! @company, :id, :name, :about , :website, :size, :revenue, :headquarters, :founded, :industry
    if @company.logo.attached? 
        json.photo_url @company.logo.url
    end 
end


json.reviews do 
    @company.reviews.each do |review|
        json.extract! review, :id, :job_title
    end
end