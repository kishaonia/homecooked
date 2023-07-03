import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionBuyerActions from "../../store/buyerSession";
import "./SignupForm.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SignupFormModalSeller from "./indexforseller"
import { useHistory } from "react-router-dom";



function SignupFormModal() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [profilephoto, setProfilePhoto] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/Feed");

    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionBuyerActions.buyerSignUp({
          username,
          firstName,
          lastName,
          password,
          DOB,
          address,
          profilephoto,
        })
      )
      
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="signup-user">
      <>
        <h1 className="signup-h1">welcome home!</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          {errors?.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}

          <label>
username            <input
              className="text-signup"
              type="text-signup"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
first name            <input
              className="text-signup"

              type="text-signup"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
last name            <input
              className="text-signup"

              type="text-signup"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
   password
            <input
              className="text-signup"

              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
confirm password
            <input
              className="text-signup"

              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <label>
            date of birth
            <input
              className="text-signup"
              type="text-signup"
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
              required
            />
          </label>
          <label>
          address
            <input
              className="text-signup"

              type="text-signup"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            Profile Photo:
            <input
              className="text-signup"

              type="text-signup"
              value={profilephoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="button-submit"
          >
            Sign Up
          </button>
        </form>
      </>

      {/* <div className="signup-others">
        <OpenModalMenuItem
        itemText="Signing up as a chef?"
        modalComponent={<SignupFormModalSeller />}
      />
      </div> */}
    </div>
  );
}

export default SignupFormModal;
