import { Switch, Route } from "react-router-dom";
import CompanyIndex from "./components/companyIndex";
import CompanyShow from "./components/companyShow";
import LoginFormPage from "./components/loginFormPage";
import LogOut from "./components/logOutButton";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/signUpForm";
import Splash from "./components/splash";
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
          <Route path = "/" >
            <SignupFormPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
