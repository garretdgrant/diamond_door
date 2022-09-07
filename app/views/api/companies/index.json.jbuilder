json.array! @companies do |c|
    json.extract! c, :id, :name, :about , :website 
    if c.logo.attached? 
        json.photo_url c.logo.url
    end 
end