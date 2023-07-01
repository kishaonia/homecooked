import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SignupFormModalChef from "./indexforseller";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          username,
          firstName,
          lastName,
          password,
          DOB,
          address,
          profilephoto,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="signup-user-sell">
    <>
      <h1 className="signup-h1">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        {errors?.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
       
        <label>
          Username:
          <input
          className="text-signup"
            type="text-signup"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name:
          <input
                    className="text-signup"

            type="text-signup"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name:
          <input
                    className="text-signup"

            type="text-signup"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
                    className="text-signup"

            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
        
          <input
                    className="text-signup"

            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Date of Birth:
          <input
                    className="text-signup"

            type="text-signup"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            required
          />
        </label>
        <label>
          Address:
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

    <div className="signup-others"><OpenModalMenuItem
    itemText="Signing up as a chef?"
    modalComponent={<SignupFormModalChef/>}
    /></div>
    </div>
  );
}

export default SignupFormModal;