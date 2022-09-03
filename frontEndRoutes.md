## Front End Routes

* `/`
    * `Splash`
* `/login`
    * `LoginForm`
* `/signup`
    * `SignupForm`
* `/users/:userId`
    * `ProfilePage`
    * `Saved Jobs` - destroy
    * `Company Reviews` - update/destroy
* `/companies`
    * `CompanyIndex` 
* `/companies/:company_id`
    * `CompanyShow`
        * `ReviewForm` - create
        * `ReviewIndex`
        * `JobsIndex` - save/unsave (specific company jobs)
* `/jobs`
    * `Jobs Index` - save/unsave (Jobs from all companies) 
* `jobs/:job_id`
    * `Job Show Page` - save/unsave
