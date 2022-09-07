json.company do
    json.extract! @company, :id, :name, :about, :website, :created_at, :updated_at
    if @company.logo.attached? 
        json.photo_url @company.logo.url
    end 
end