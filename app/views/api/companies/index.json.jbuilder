# json.array! @companies do |c|
#     json.extract! c, :id, :name, :about , :website 
#     if c.logo.attached? 
#         json.photo_url c.logo.url
#     end 
# end

@companies.each do |company|
    json.set! company.id do
        json.extract! company, :id, :name, :about , :website 
        if company.logo.attached? 
            json.photo_url company.logo.url
        end 
    end
end