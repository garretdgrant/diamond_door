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
import UpdateUserForm from "./components/UpdateUserForm";
import { UserProfile } from "./components/UserProfile";
import "./index.css"


function App() {
  return (
    <>
      <Switch >
          <Route exact path="/login" ><LoginFormPage /></Route>
          <Route exact path="/signup"><SignupFormPage /></Route>
          <Route exact path = "/" ><Splash /></Route>
          <div>
            <Navigation />
            <Route exact path='/add-review/:companyId'><AddReviewForm /></Route>
            <Route exact path='/update-review/:reviewId/:companyId'><UpdateReviewForm /></Route>
            <Route exact path='/add-interview/:companyId'><AddInterviewForm /></Route>
            <Route exact path='/update-interview/:interviewId/:companyId'><UpdateInterviewForm /></Route>
            <Route exact path='/profile'><UserProfile /></Route>
            <Route exact path='/update-user' ><UpdateUserForm /></Route>
            <Route exact path='/companies'><CompanyIndex /></Route> 
            <Route exact path='/companies/:companyId'><CompanyShow /></Route>
          </div>
        </Switch>
    </>
  );
}

export default App;
