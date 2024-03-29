import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './loginForm.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

  if (sessionUser) return <Redirect to="/companies" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
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

  const handleDemo = () =>{
    return dispatch(sessionActions.login({ email: "demo@user.io", password: "password" }))
  }

  return (
    <>
        <form onSubmit={handleSubmit} className="login-form">
         <img src="sessionBackground.jpg" alt="" />
            <div className='login-inputs'>
            <h1 className='login-form-header'>
            Sign In to access company reviews
            </h1>
          
                <input
                type="text"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                placeholder='Email'
                />
            
        
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
                />

        
            <button type="submit">Log In</button>
            <button onClick={handleDemo}>Demo Log In</button>
            <a className='sign-up-link-on-login' href="/signup">No Account? Sign Up!</a>
        </div>
              {errors ? 
              <div class="login-error-flexer">
                <div class="error-container">
                  <ul>
                      {errors.map(error => <li key={error}>{error}</li>)}
                  </ul>
                </div>
              </div>
              : null}
        </form>
    </>
  );
}

export default LoginFormPage;