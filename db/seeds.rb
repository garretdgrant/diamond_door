# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      f_name: 'Garret',
      l_name: 'Grant', 
      email: 'demo@user.io', 
      password: 'password',
      job_title: 'engineer'
    )
  
    # More users
    10.times do 
        f_name = Faker::Name.first_name
        l_name = Faker::Name.last_name
        email = Faker::Internet.unique.email(name: f_name + ' ' + l_name)
      User.create!({
        f_name: f_name,
        l_name: l_name,
        email: email,
        phone: Faker::PhoneNumber.cell_phone,
        job_title: Faker::Job.title,
        password: 'password'
      }) 
    end
  
    puts "Done!"
  end