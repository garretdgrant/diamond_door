import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as session from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [phone,setPhone] = useState("")
  const [website, setWebsite] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

//   if (Object.keys(sessionUser).length > 0) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
        email: email,
        password: confirmPassword,
        fName,
        lName,
        phone,
        skills,
        website,
        aboutMe,
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

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
     
      <label>
        First Name
        <input
          type="text"
          value={fName}
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </label>

      <label>
        Last Name
        <input
          type="text"
          value={lName}
          onChange={(e) => setLname(e.target.value)}
          required
        />
      </label>

      <label>
        Job Title
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;