# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'open-uri'



ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Company.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    tables = ['users', 'companies']
    tables.each do |table|
      ApplicationRecord.connection.reset_pk_sequence!(table)
    end
  
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

    puts "Seeding Companies"

# Netflix Seed
  netflix = Company.create!(name: 'Netflix', about: "Netflix is the world's leading streaming 
    entertainment service with 193 million paid memberships in over 190 countries enjoying TV 
    series, documentaries and feature films across a wide variety of genres and languages. 
    Members can watch as much as they want, anytime, anywhere, on any internet-connected screen. 
    Members can play, pause and resume watching, all without commercials or commitments.", website: "www.netflix.com",
    size: '5001 to 10000 Employees', revenue: '$5 to $10 billion (USD)', headquarters: 'Los Gatos, CA', 
    founded: '1997', industry: 'Internet & Web Services'
  )
  logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_netflix.png')
  netflix.logo.attach(io: logo, filename: 'logo_netflix.png')

#Nvidia
nvidia = Company.create!(name: 'Nvidia', about: "NVIDIA pioneered accelerated computing to tackle challenges no one 
else can solve. We engineer technology for the da Vincis and Einsteins of our time. Our work in AI and the metaverse 
is profoundly impacting society and transforming the world's largest industries. From gaming to robotics, self-driving 
cars to life-saving healthcare, climate change to virtual worlds where we can all connect and create. \n \n
Our work is truly unique. Part science. Part art. Completely rewarding. We take on challenges that make a significant 
difference in the world. Every breakthrough helps shape what comes next.", website: "www.nvidia.com",
size: '10000+ Employees', revenue: '$5 to $10 billion (USD)', headquarters: 'Santa Clara, CA', 
founded: '1993', industry: 'Computer Hardware Development'
)
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/log_nvidia.png')
nvidia.logo.attach(io: logo, filename: 'log_nvidia.png')

#FiveNine
fiveNine = Company.create!(name: 'Five9', about: "Five9 is a leading provider of cloud software for the enterprise 
  contact center market, bringing the power of the cloud to thousands of customers and facilitating over three billion 
  customer interactions annually. Since 2001, Five9 has led the cloud revolution in contact centers, helping organizations 
  transition from legacy premise-based solutions to the cloud. Five9 provides businesses with cloud contact center 
  software that is reliable, secure, compliant and scalable, which is designed to create exceptional customer experiences, 
  increase agent productivity and deliver tangible business results. For more information visit www.five9.com.", website: "www.five9.com",
  size: '1001 to 5000 Employees', revenue: '$100 to $500 million (USD)', headquarters: 'San Ramon, CA', 
  founded: '2001', industry: 'Enterprise Software & Network Solutions'
  )
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_59.png')
fiveNine.logo.attach(io: logo, filename: 'logo_59.png')


adobe = Company.create!(name: 'Adobe', about: "Adobe is the global leader in digital media and digital marketing solutions. 
  Our creative, marketing and document solutions empower everyone - from emerging artists to global brands - to bring digital 
  creations to life and deliver immersive, compelling experiences to the right person at the right moment for the best results. 
  In short, Adobe is everywhere, and we're changing the world through digital experiences.", website: "www.adobe.com",
  size: '10000+ Employees', revenue: '$5 to $10 billion (USD)', headquarters: 'San Jose, CA', 
  founded: '1982', industry: 'Computer Hardware Development'
  )
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_adobe.png')
adobe.logo.attach(io: logo, filename: 'logo_adobe.png')

amd = Company.create!(name: 'AMD', about: "amd is the global leader in digital media and digital marketing solutions. 
  Our creative, marketing and document solutions empower everyone - from emerging artists to global brands - to bring digital 
  creations to life and deliver immersive, compelling experiences to the right person at the right moment for the best results. 
  In short, amd is everywhere, and we're changing the world through digital experiences.", website: "www.amd.com",
  size: '5001 to 10000 Employees', revenue: '$1 to $5 billion (USD)', headquarters: 'Santa Clara, CA', 
  founded: '1969', industry: 'Computer Hardware Development'
  )
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_amd.png')
amd.logo.attach(io: logo, filename: 'logo_amd.png')

appfolio = Company.create!(name: 'AppFolio', about: "AppFolio is a leading cloud business management solutions provider for the real 
  estate industry. Our solutions enable customers to digitally transform their businesses, address critical business operations and 
  deliver a better customer experience.

  Our vision is a world where choosing, living in, owning and managing communities feels effortless, freeing people to thrive.", 
  website: "www.appfolio.com", size: '1001 to 5000 Employees', revenue: 'Unkown / Non-Applicable', headquarters: 'Santa Barbara, CA', 
  founded: '2006', industry: 'Software Development'
)
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_appfolio.png')
appfolio.logo.attach(io: logo, filename: 'logo_appfolio.png')


apple = Company.create!(name: 'Apple', about: "We're a diverse collective of thinkers and doers, continually reimagining what's possible 
  to help us all do what we love in new ways. And the same innovation that goes into our products also applies to our practices — 
    strengthening our commitment to leave the world better than we found it. This is where your work can make a difference in people's lives. 
    Including your own.", 
  website: "www.apple.com", size: '10000+ Employees', revenue: '$10+ billion (USD)', headquarters: 'Cupertino, CA', 
  founded: '1976', industry: 'Computer Hardware Development')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_apple.png')
apple.logo.attach(io: logo, filename: 'logo_apple.png')


autodesk = Company.create!(name: 'Autodesk', about: "From the greenest buildings to the cleanest cars, from the smartest factories to the biggest 
  stories, amazing things are created every day with Autodesk. Over four decades we've worked together with our customers to transform how things 
  are made, and in doing so, we've also transformed what can be made. A car's performance now inspires the method of its manufacture, a city's 
  infrastructure helps predict the unpredictable, and the creation of ever-bigger universes shapes ever-bigger stories.

  Today our solutions span countless industries empowering innovators everywhere. But we're restless to do more. We don't believe in waiting for progress, 
    we believe in making it. By combining and recombining technologies. By blurring boundaries, reinventing rules, and merging fields. By unleashing talent 
    and unlocking insights across industries. By helping our customers converge on solutions to the challenges we all face today. At Autodesk, we believe 
    that when you have the right tools to work and think flexibly you have the power to transform what actually needs making. The power to design and make a 
    better world for all.", 
  website: "www.autodesk.com", size: '10000+ Employees', revenue: '$1 to $5 billion (USD)', headquarters: 'San Rafael, CA', 
  founded: '1982', industry: 'Computer Hardware Development')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_autodesk.png')
autodesk.logo.attach(io: logo, filename: 'logo_autodesk.png')

box = Company.create!(name: 'Box', about: "Founded in 2005, Box (NYSE: BOX) is transforming the way people and organizations work, so they can achieve their 
greatest ambitions. As the world's leading enterprise software platform for content collaboration, Box helps business of all sizes - in every industry - 
securely access and manage their critical information in the cloud. Headquartered in Redwood City, CA, Box has offices across the United States, Europe and Asia. 
To learn more about Box, visit www.box.com.", 
  website: "www.box.com", size: '1001 to 5000 Employees', revenue: '$500 million to $1 billion (USD)', headquarters: 'Redwood City, CA', 
  founded: '2005', industry: 'Computer Hardware Development')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_box.png')
box.logo.attach(io: logo, filename: 'logo_box.png')
  

fidelity = Company.create!(name: 'Fidelity', about: "At Fidelity Investments, our customers are at the heart of everything we do. As a privately held company with a 
  rich 75-year history, our mission has remained the same since our founding: to strengthen the financial well-being of our clients. We help people invest and plan 
  for their future. We assist companies and non-profit organizations in delivering benefits to their employees. And we provide institutions and independent advisors 
  with investment and technology solutions to help invest their own clients' money.", 
  website: "www.fidelity.com", size: '10000+ Employees', revenue: '$10+ billion (USD)', headquarters: 'Boston, MA', 
  founded: '1946', industry: 'Investment & Asset Management')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_fidelity.png')
fidelity.logo.attach(io: logo, filename: 'logo_fidelity.png')

google = Company.create!(name: 'Google', about: "Since our founding in 1998, Google has grown by leaps and bounds. Starting from two computer science students in a 
  university dorm room, we now have over a hundred thousand employees and over one hundred offices around the world. These Googlers build products that help create 
  opportunities for everyone, whether down the street or across the globe. So whether you want to be a part of developing innovative technology, campaigns, products or 
  partnerships, your work here is a chance to accomplish things that matter. To learn more about our job opportunities, teams, offices, benefits and workplace culture, 
  visit careers.google.com.", 
  website: "www.google.com", size: '10000+ Employees', revenue: '$10+ billion (USD)', headquarters: 'Mountain View, CA', 
  founded: '1998', industry: 'Internet & Web Services')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_google.png')
google.logo.attach(io: logo, filename: 'logo_google.png')


hubspot = Company.create!(name: 'Hubspot', about: "HubSpot (NYSE: HUBS) is a leading customer relationship management 
(CRM) platform that provides software and support to help businesses grow better. We build marketing, sales, service, 
and website management products that start free and scale to meet our customers' needs at any stage of growth. We're 
also building a company culture that empowers people to do their best work through. If that sounds like something 
you'd like to be part of, we'd love to hear from you.", 
  website: "www.hubspot.com", size: '1001 to 5000 Employees', revenue: '$500 million to $1 billion (USD)', headquarters: 'Cambridge, MA', 
  founded: '2006', industry: 'Computer Hardware Development')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_hubspot.png')
hubspot.logo.attach(io: logo, filename: 'logo_hubspot.png')

intel = Company.create!(name: 'Intel', about: "Intel's mission is to shape the future of technology to help create a 
  better future for the entire world. By pushing forward in fields like AI, analytics and cloud-to-edge technology, 
  Intel's work is at the heart of countless innovations. From major breakthroughs like self-driving cars and rebuilding 
  the coral reefs, to things that make everyday life better like blockbuster effects and improved shopping experiences 
  — they're all powered by Intel technology. With a career at Intel, you have the opportunity to help make the future 
  more wonderful for everyone.", 
  website: "www.intel.com", size: '10000+ Employees', revenue: '$10+ billion (USD)', headquarters: 'Santa Clara, CA', 
  founded: '1968', industry: 'Computer Hardware Development'
  )
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_intel.png')
intel.logo.attach(io: logo, filename: 'logo_intel.png')

linkedin = Company.create!(name: 'LinkedIn', about: "LinkedIn is the world's largest professional network, built to 
  create economic opportunity for every member of the global workforce. Our products help people make powerful connections, 
  discover exciting opportunities, build necessary skills, and gain valuable insights every day. We're also committed to 
  providing transformational opportunities for our own employees by investing in their growth. We aspire to create a culture 
  that's built on trust, care, inclusion, and fun - where everyone can succeed.", 
  website: "www.linkedin.com", size: '10000+ Employees', revenue: '$5 to $10 billion (USD)', headquarters: 'Sunnyvale, CA', 
  founded: '2003', industry: 'Internet & Web Services')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_linkedin.png')
linkedin.logo.attach(io: logo, filename: 'logo_linkedin.png')


lulu = Company.create!(name: 'Lulu Lemon', about: "Founded in Vancouver, Canada in 1998, lululemon athletica is a technical 
  athletic apparel company for yoga, running, training and most other sweaty pursuits.", 
  website: "www.lululemon.com", size: '10000+ Employees', revenue: '$5 to $10 billion (USD)', headquarters: 'Vancouver, Canada', 
  founded: '1998', industry: 'Department, Clothing & Shoe Stores'
  )
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_lulu.png')
lulu.logo.attach(io: logo, filename: 'logo_lulu.png')


meta = Company.create!(name: 'Meta', about: "The Facebook company is now Meta. Meta builds technologies that help people 
  connect, find communities, and grow businesses. When Facebook launched in 2004, it changed the way people connect. 
  Apps like Messenger, Instagram and WhatsApp further empowered billions around the world. Now, Meta is moving beyond 2D 
  screens toward immersive experiences like augmented and virtual reality to help build the next evolution in social 
  technology.", 
  website: "www.facebook.com", size: '10000+ Employees', revenue: '$10+ billion (USD)', headquarters: 'Menlo Park, CA', 
  founded: '2004', industry: 'Internet & Web Services')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_meta.png')
meta.logo.attach(io: logo, filename: 'logo_meta.png')



microsoft = Company.create!(name: 'Microsoft', about: "Computer hardware development.", 
  website: "www.microsoft.com", size: '10000+ Employees', revenue: '$10+ billion (USD)', headquarters: 'Redmond, WA', 
  founded: '1975', industry: 'Computer & Hardware Development'
  )
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_microsoft.png')
microsoft.logo.attach(io: logo, filename: 'logo_microsoft.png')



qualtrics = Company.create!(name: 'Qualtrics', about: "Qualtrics is the technology platform that organizations use to 
  collect, manage, and act on experience data, also called X-data™. The Qualtrics XM Platform™ is a system of action, 
  used by teams, departments, and entire organizations to manage the four core experiences of business—customer, product, 
  employee, and brand—on one platform. If you're searching for a company that's dedicated to your ideas and growth, 
  recognizes your unique contribution, fills you with purpose, and provides a fun, flexible and inclusive work environment - 
  apply now!", 
  website: "www.qualtrics.com", size: '5001 to 10000 Employees', revenue: 'Unknown / Non-Applicable', headquarters: 'Provo, UT', 
  founded: '2002', industry: 'Computer Hardware Development')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_qualtrics.png')
qualtrics.logo.attach(io: logo, filename: 'logo_qualtrics.png')



rivian = Company.create!(name: 'Rivian', about: "Rivian exists to help solve problems that are undermining the health 
  of our planet and its inhabitants. Our products and services can significantly contribute to our mission to keep the 
  world adventurous forever — but our ambitions go well beyond. The obstacles created by human enterprise today are 
  daunting, but the opportunity to create solutions is what drives us every day. We stand on the side of innovation and 
  possibility. By offering products and services that inspire people to explore and enjoy our world, we hope to also 
  inspire them to want to protect it.", 
  website: "www.rivian.com", size: '5001 to 10000 Employees', revenue: 'Unknown / Non-Applicable', headquarters: 'Irvine, CA', 
  founded: '2009', industry: 'Transportation Equipment Manufacturing')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_rivian.png')
rivian.logo.attach(io: logo, filename: 'logo_rivian.png')



roche = Company.create!(name: 'Roche', about: "Roche is a global pioneer in pharmaceuticals and diagnostics focused on 
  advancing science to improve people's lives. The combined strengths of pharmaceuticals and diagnostics under one roof 
  have made Roche the leader in personalised healthcare - a strategy that aims to fit the right treatment to each patient 
  in the best way possible.", 
  website: "www.roche.com/careers", size: '5001 to 10000 Employees', revenue: '$10+ billion (USD)', headquarters: 'Pleasanton, CA', 
  founded: '1896', industry: 'Biotech & Pharmaceuticals')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_roche.png')
roche.logo.attach(io: logo, filename: 'logo_roche.png')



salesforce = Company.create!(name: 'Salesforce', about: "Salesforce is the #1 CRM, bringing companies and customers together 
  in the digital age. Founded in 1999, Salesforce enables companies of every size and industry to take advantage of powerful 
  technologies—cloud, mobile, social, voice, and artificial intelligence—to connect to their customers in a whole new way. 
  The Salesforce Customer 360 is an integrated CRM platform, powered by AI, that unites marketing, sales, commerce, IT and 
  analytics departments. It gives these teams a single, shared view of their customers so they can work together to build 
  lasting, trusted relationships and deliver the personalized experiences their customers expect.", 
  website: "www.salesforce.com", size: '10000+ Employees', revenue: '$10+ billion (USD)', headquarters: 'San Francisco, CA', 
  founded: '1999', industry: 'Enterprise Software & Network Solutions')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_salesforce.png')
salesforce.logo.attach(io: logo, filename: 'logo_salesforce.png')



visa = Company.create!(name: 'Visa', about: "Visa (NYSE: V) is a world leader in digital payments, facilitating more than 215 
billion payments transactions between consumers, merchants, financial institutions and government entities across more than 
200 countries and territories each year. Our mission is to connect the world through the most innovative, convenient, 
reliable and secure payments network, enabling individuals, businesses and economies to thrive. We believe that economies 
that include everyone everywhere, uplift everyone everywhere and see access as foundational to the future of money movement. 
Learn more at Visa.com.", 
  website: "www.visa.com", size: '10000+ Employees', revenue: '$10+ billion (USD)', headquarters: 'Foster City, CA', 
  founded: '1958', industry: 'Information Technology Support Services')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_visa.png')
visa.logo.attach(io: logo, filename: 'logo_visa.png')



zillow = Company.create!(name: 'Zillow', about: "Our journey began nearly 15 years ago with a handful of employees and one big 
  idea: to make it radically easier for people to move. We began by helping people understand and track their home's with the 
  Zestimate, our proprietary algorithm, and then with advanced technology and valuable connections with real estate professionals. 
  Today, Zillow has become a household name. People are more likely to search for “Zillow” than “real estate,” and our name is 
  often used as a verb.", 
  website: "www.zillow.com", size: '5001 to 10000 Employees', revenue: '$1 to $5 billion (USD)', headquarters: 'Seattle, WA', 
  founded: '2005', industry: 'Real Estate')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_zillow.png')
zillow.logo.attach(io: logo, filename: 'logo_zillow.png')



zoom = Company.create!(name: 'Zoom Video Communications', about: "Zoomies help people stay connected so they can get more done together. We set out on 
  a mission to make video communications frictionless and secure by building the world's best video product for the enterprise, 
  but we didn't stop there. With products like Zoom Contact Center, Zoom Phone, Zoom Events, Zoom Apps, Zoom Rooms, and Zoom Webinar, 
  we bring innovation to a wide variety of customers, from the conference room to the classroom, from doctor’s offices to financial 
  institutions to government agencies, from global brands to small businesses.", 
  website: "www.zoom.com", size: '1001 to 5000 Employees', revenue: '$1 to $5 billion (USD)', headquarters: 'San Jose, CA', 
  founded: '2011', industry: 'Information Technology Support Services')
logo = URI.open('https://diamond-door-dev.s3.us-west-1.amazonaws.com/logo_zoom.png')
zoom.logo.attach(io: logo, filename: 'logo_zoom.png')

  
    puts "Done!"
end