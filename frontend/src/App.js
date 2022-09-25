import { Switch, Route } from "react-router-dom";
import AddInterviewForm from "./components/AddInterviewForm";
import AddReviewForm from "./components/AddReviewForm";
import CompanyIndex from "./components/companyIndex";
import CompanyShow from "./components/companyShow";
import LoginFormPage from "./components/loginFormPage";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/signUpForm";
import Splash from "./components/splash";
import UpdateInterviewForm from "./components/UpdateInterviewForm";
import UpdateReviewForm from "./components/UpdateReview";
import { UserProfile } from "./components/UserProfile";
import "./index.css"


function App() {
  return (
    <>
      <Navigation />
      <Switch >
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/companies'>
            <CompanyIndex />
          </Route> 
          <Route  path='/companies/:companyId'>
            <CompanyShow />
          </Route>
          <Route path='/add-review/:companyId'>
            <AddReviewForm />
          </Route>
          <Route path='/update-review/:reviewId/:companyId'>
            <UpdateReviewForm />
          </Route>
          <Route path='/add-interview/:companyId'>
            <AddInterviewForm />
          </Route>
          <Route path='/update-interview/:interviewId/:companyId'>
            <UpdateInterviewForm />
          </Route>
          <Route path='/profile'>
            <UserProfile />
          </Route>
          <Route path = "/" >
            <LoginFormPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
