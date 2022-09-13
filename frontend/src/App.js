import { Switch, Route } from "react-router-dom";
import AddReviewForm from "./components/AddReviewForm";
import CompanyIndex from "./components/companyIndex";
import CompanyShow from "./components/companyShow";
import LoginFormPage from "./components/loginFormPage";
import LogOut from "./components/logOutButton";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/signUpForm";
import Splash from "./components/splash";
import UpdateReviewForm from "./components/UpdateReview";
import "./index.css"


function App() {
  return (
    <>
      <Navigation />
      <Switch >
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/splash">
            <Splash />
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
          <Route path='/update-review/:reviewId'>
            <UpdateReviewForm />
          </Route>
          <Route path = "/" >
            <SignupFormPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
