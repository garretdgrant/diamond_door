import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/loginFormPage";
import LogOut from "./components/logOutButton";
import SignupFormPage from "./components/signUpForm";


function App() {
  return (
    <>
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
