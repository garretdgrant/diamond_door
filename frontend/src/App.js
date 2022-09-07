import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/loginFormPage";
import LogOut from "./components/logOutButton";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/signUpForm";
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
        </Switch>
        <LogOut />

    </>
  );
}

export default App;
