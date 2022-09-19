## Diamond Door
---

[Live site](https://diamond-door.herokuapp.com/)

Diamond Door is a full-stack clone of glassdoor.com, a job review app.


Technologies:
---
---

* Ruby on Rails
* React.js
* Redux.js
* Node.js
* PostgreSQL
* Webpack
* Amazon AWS S3


Diamond Door is built with a Ruby on Rails backend framework. The frontend utilizes React and Redux to create a dynamic single page application. All data is stored through PostgreSQL database, with photos for company logos being uploaded and stored through Amazon AWS S3. These technologies allow users to smoothly navigate throughout the site and allow for dynamic creation, updating, and deleting of interviews and reviews. Users are also able to follow and unfollow companies. 


Features:
---
---

User Authentication:
---

* Users can sign up for an account on Diamond Door. They can also log in to view their profile page.
* Users can log in or sign up via the buttons in the top right corner. Once logged in they those buttons are replaced with Logout and Profile buttons. 
* If a visitor does not want to create an account, they can log in as a Demo User. This provides them with full access to Diamond Door's review, interview, and follow features.
* Users must be logged in to access any features of Diamond Door. 

Reviews:
---
* At the bottom of the company show page, users will see all reviews for that company.
* If they have left a review, they will be able to edit or remove said review.
* Users are limited to one review per company.

Interviews:
---
* At the top of the company show page, users can click an interviews button to reveal interview experiences.
* At the bottom of the company show page, users will see all interviews for that company.
* If they have left an interview, they will be able to edit or remove said interview.
* Users are allowed to post as many interview experiences as desired.


Follows:
---
* At the top of the company show page, users can click a follow button to follow a company.
* If the user follows a company, the follow button is replaced with an unfollow button, to unfollow the company.
* Followed companies are displayed on the user profile page.
* Users are allowed to follow as many companies desired.

