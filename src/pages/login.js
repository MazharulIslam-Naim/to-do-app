import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BsFillLockFill, BsPersonFill } from 'react-icons/bs';

import "./login.css";

export default function Login() {
  const navigate  = useNavigate();
  const [email, setEmail] = useState(""); // Email inputed by user.
  const [valEmail, setValEmail] = useState(); // Is the email valid.
  const [password, setPassword] = useState(""); // Password inputed by user.
  const [valPassword, setValPassword] = useState(); // Is the password valid.

  // Check if the email inputed is an email useing a regex.
  function validateEmail(event) {
    setEmail(event.target.value);
    let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRegEx.test(event.target.value)) {
      setValEmail(true)
    } else {
      setValEmail(false)
    }
  };

  // Check if the password inputed is more then 4 characters.
  function validatePassword(event) {
    setPassword(event.target.value)
    if (event.target.value.length >= 4) {
      setValPassword(true)
    } else {
      setValPassword(false)
    }
  };

  // On form submit make a request to an api and if the response is normal then send user the list page.
  function onSubmit(event) {
    event.preventDefault();
    setValEmail();
    setValPassword();
    if (valEmail && valPassword) {
      axios.post('http://dev.rapptrlabs.com/Tests/scripts/user-login.php', {
        email: email,
        password: password
      })
      .then(function (response) {
        navigate("/list")
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  return (
    <div className="loginPage">
      <form onSubmit={onSubmit} className="form">
        <h1>Rapptr Labs</h1>
        <label>Email:</label>
        <div className={valEmail === false ? "inputError" : "input"}>
          <BsPersonFill className="inputIcon"/>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="user@rapptrlabs.com"
            maxLength="50"
            value={email}
            onChange={event => validateEmail(event)}
          />
        </div>
        <h4 className={valEmail === false ? "errorText" : "clearText"}>Not a valid email</h4>

        <label>Password:</label>
        <div className={valPassword === false ? "inputError" : "input"}>
          <BsFillLockFill className="inputIcon"/>
          <input
            type="password"
            id="pwd"
            name="pwd"
            placeholder="Must be at least 4 characters"
            maxLength="16"
            value={password}
            onChange={event => validatePassword(event)}
          />
        </div>
        <h4 className={valPassword === false ? "errorText" : "clearText"}>Not a valid password</h4>
        <div className="submitButtonCont">
          <button
            type="submit"
            disabled={!valEmail || !valPassword}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
