

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import Navigation from "../Navigation";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import * as sessionSellerActions from "../../store/sellerSession";
import SignupFormModalSeller from "../SignupFormModal/indexforseller";

function LoginFormSeller() {
  const currentUser = useSelector((state) => state?.session?.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await dispatch(sessionSellerActions.login({ credential, password }));
      closeModal();
      history.push("/FeedSeller");
    } catch (res) {
      if (res.status === 401) {
        setErrors(["User not found. Please check your credentials."]);
      } else {
        const data = await res?.json();
        if (data && data.errors) setErrors(data.errors);
      }
    }
  
  };

  const demoSignIn = async (e) => {
    e.preventDefault();
    const password = "password";
    const credential = "johndoe";

    try {
      await dispatch(sessionSellerActions.login({ credential, password }));
      closeModal();
      history.push("/FeedSeller");
    } catch (error) {
      console.log(error);
    }
  };

  if (currentUser) {
    history.push("/");
  }


 

 
  return (
    <>
     <div className="login-seller">Welcome back, chef!</div>
  <form className="login-form" onSubmit={handleSubmit}>
    {errors.length > 0 && (
      <ul className="error-messages">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
    )}
    <label>
     username
      <br />
      <input
        className="input-for-login"
        type="text-login"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
        required
      />
    </label>
    <label>
    password
      <br />
      <input
        className="input-for-login"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </label>
    <button
      className="button-submit-login"
      type="submit"
      disabled={credential.length < 4 || password.length < 6}
    >
      Log In
    </button>
  
    <button onClick={demoSignIn} type="submit" id="demo-user-button">
      login as demo user
    </button>
    <OpenModalMenuItem
      className="signup-button-home"
      itemText="Sign Up"
      modalComponent={<SignupFormModalSeller />}
    />
  </form>

    </>
  );
}

export default LoginFormSeller;
