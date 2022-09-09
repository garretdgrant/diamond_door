@companies.each do |company|
    json.set! company.id do
        json.extract! company, :id, :name, :about , :website, :size, :revenue, :headquarters, :founded, :industry
        if company.logo.attached? 
            json.photo_url company.logo.url
        end 
    end
end