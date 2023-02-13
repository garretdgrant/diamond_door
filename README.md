# README

# Table of Contents

### 1) Introduction
### 2) Technology Stack
### 3) Features (with Screen Grabs)
### 4) Code Snippets

&nbsp;  


# Introduction
## Welcome to Diamond Door README

This README will outline the features, intent, and technology of Diamond Door.

[Diamond Door](https://diamond-door.herokuapp.com/) is a project clone of the popular job review app: Glassdoor. This app was developed as a demonstration of knowledge and skills in the technology stack utillized, and is in no way meant to be monetized. I chose to make a clone of Glassdoor because I found it to have complicated features that would provide logical challenges and a great learning experience. Building this site brought many challenges that I have had a great learning experiencing overcoming. I am proud of the work I was able to accomplish with this full-stack clone and I hope you have time to explore all its features! Feel free to contact me at garret.grant.swe@gmail.com with any questions you may have while exploring my application!
<br/><br/>


# Technology Stack

- Frontend: JavaScript, React.js + Redux.js, HTML, CSS
- Backend: Ruby on Rails, PostgreSQL
- Additional: AWS S3, Heroku, Google Fonts

&nbsp;

# Features

## 1) User Authentication:

- Diamond Door has the full User Authentication pattern (signup, login, demo login), limiting all of its features to users who create an account/login. Logged in users can see and populate reviews and interviews on companies. Users are also able to edit or delete their profile, reviews, and interviews:

![LoginPage](./frontend/public/diamond_door_login_page.jpg)

&nbsp;


## 2) Creating, Reading, Updating, and Destroying Reviews:

- As mentioned above, users can add reviews on companies and they also have the ability to edit or delete reviews they have left:

![Reviews](https://media.giphy.com/media/1AN6b5SjNDOmot6clY/giphy.gif)

&nbsp;


## 3) Creating, Reading, Updating, and Destroying Interviews:

- Similar to reviews, Users can describe their interview process with a company:

&nbsp;

## 4) Following and Unfollowing Companies
- Users can follow and unfollow companies. Followed companies will be rendered on the user profile page:

# Code Snippets
## Ruby on Rails
### Code Description: Migration to create users table in PostgreSQL relational database
``` Ruby
class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false, index: {unique: true}
      t.string :f_name, null: false
      t.string :l_name , null: false
      t.string :website
      t.bigint :phone
      t.text :about_me
      t.string :job_title, null: false
      t.text :skills
      t.string :password_digest, null: false
      t.string :session_token, null: false, index: {unique: true}

      t.timestamps
    end
  end
end
```
### Code Description: User model featuring authentication, custom validations, and associations.
``` Ruby
class User < ApplicationRecord
    has_secure_password
    before_validation :ensure_session_token

    validates :email, :first_name, :last_name, :job_title, :password_digest, :session_token, 
        presence: true
    validates :email, length: {in: 3..255}, 
        format: {with: URI::MailTo::EMAIL_REGEXP, message: 'must be a valid email'}, uniqueness: true
    validates :first_name, :last_name, :job_title, length: {message: 'must be between 3 and 20 characters', in: 3..20}
    validates :password, allow_nil: true, length:{in: 6..255}
    validates :session_token, uniqueness: true

    has_many :reviews, dependent: :destroy
    has_many :interviews, dependent: :destroy
    has_many :follows, dependent: :destroy

    def self.find_by_credentials(email, password) 
        User.find_by(email: email)&.authenticate(password)
    end

    def reset_session_token!
        self.update!({session_token: generate_unique_token })
        self.session_token
    end

    private
    def generate_unique_token
        while true 
            token = SecureRandom::base64
            return token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_token
    end

end
```

### Code Description: API endpoint returning user data in JSON format
``` Ruby
json.user do
    json.extract! @user, :id, :email,:phone, :first_name,
        :last_name,:website, :about_me, :job_title, :skills, :created_at, :updated_at
end

json.follows do 
    @user.follows.each do |follow|
        json.set! follow.id do
            json.extract! follow, :id, :company_id, :user_id, :created_at
        end
    end
end
```

## Javascript
### Code Desription: Using redux library to configure store, middleware, and root reducer. 
``` js
import { createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import companiesReducer from "./companies";
import sessionReducer from "./session";
import reviewsReducer from "./reviews";
import interviewsReducer from "./interviews";
import followsReducer from "./follows";

const rootReducer = combineReducers({
    interviews: interviewsReducer,
    reviews: reviewsReducer,
    session: sessionReducer,
    companies: companiesReducer,
    follows: followsReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {})=>{
    return createStore(rootReducer,preloadedState, enhancer)
}

export default configureStore;
```
### Code Description: Company Index page built with React featuring use of react hooks.
```js
import './companyIndex.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {fetchCompanies} from '../../store/companies'
import { Redirect, Link, useHistory } from 'react-router-dom';
import CompanyInfo from './CompanyInfo';


const CompanyIndex = () => {
    const companies = Object.values(useSelector(state => state.companies))
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user)
    const history = useHistory();

    useEffect(()=>{
        dispatch(fetchCompanies())
    },[])

    if (!sessionUser) history.push('/login');
    if(!companies) return null;
    return (
        <>
            <div className='parent-companies-container'>
                 <h1 className='companies-index-header'>Companies Recommended for You</h1>
                <div className='companies-container'>
                        {companies.map(company => (
                            <CompanyInfo company={company} key={company.id} />
                             )  
                        )}
                </div>
            </div>
        </>
    )
}

export default CompanyIndex;
```
