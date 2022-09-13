json.review do
    json.extract! @review, :id, :company_id, :user_id, :rating, :current_employee, :former_employee, :employment_status,
    :job_title, :headline, :pros, :cons, :advice
end