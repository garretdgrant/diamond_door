import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as session from "../../store/session";
import './signUpForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [phone,setPhone] = useState("")
  const [jobTitle, setJobTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  useEffect(()=>{

  },[sessionUser])

  if (sessionUser) return <Redirect to="/companies" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
        email: email,
        password: confirmPassword,
        fName,
        lName,
        phone,
        jobTitle
      };
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(session.signup(userData))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const handleDemo = (e) =>{
    e.preventDefault()
    return dispatch(session.login({ email: "demo@user.io", password: "password" }))
  }

  return (
    <>
        <form onSubmit={handleSubmit} className='sign-up-form'>
            <img src="sessionBackground.jpg" alt="" />
        <div className="sign-up-inputs">
        <h1 className="sign-up-header">You deserve a job that loves you back</h1>
      {errors ? 
        <div class="error-container">
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </div>
      
      : null}
            <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            />
    
            <input
            type="text"
            value={fName}
            onChange={(e) => setFname(e.target.value)}
            required
            placeholder="First Name"
            />
    
            <input
            type="text"
            value={lName}
            onChange={(e) => setLname(e.target.value)}
            placeholder="Last Name"
            required
            />
       

       
            
            <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            placeholder="Job Title"
            />
        

        
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            />
       

        
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            />
        
        <button type="submit">Sign Up</button>
        <button onClick={handleDemo}>Demo Log In</button>
        <a className="login-link-on-signup" href="/login">Already have an account? Log In!</a>
        </div>

        </form>
    </>
  );
}

export default SignupFormPage;