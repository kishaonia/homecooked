// // frontend/src/components/LoginFormModal/index.js
// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import "./LoginForm.css";

// function LoginFormModal() {
//   const dispatch = useDispatch();
//   const [credential, setCredential] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const { closeModal } = useModal();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     return dispatch(sessionActions.login({ credential, password }))
//       .then(closeModal)
//       .catch(async (res) => {
//         const data = await res?.json();
//         if (data && data.errors) setErrors(data.errors);
//       });
//   };

//   return (
//     <>
//       <h1 className="login-h1">Log In</h1>
//       <form className="login-form" onSubmit={handleSubmit}>
//         {errors.map((error, idx) => (
//           <li key={idx}>{error}</li>
//         ))}

//         <label>
//           Username or Email:
//           <br></br>
//           <input
//             type="text-login"
//             value={credential}
//             onChange={(e) => setCredential(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password:
//           <br></br>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>

//         <button
//             className="button-submit-login"
//             type="submit"
//             // disabled={credential.length < 4 || password.length < 6}
//         >
//                 Log In
//             </button>

//       </form>
//     </>
//   );
// }

// export default LoginFormModal;



import React, { useState, useRef } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import Navigation from "../Navigation";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import bglogin from "../../assets/bglogin.mp4";

function LoginFormModal() {
  const currentUser = useSelector((state) => state?.session?.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const videoRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await dispatch(sessionActions.login({ credential, password }));
      closeModal();
      history.push("/");
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
    const credential = "janedoe";

    try {
      await dispatch(sessionActions.login({ credential, password }));
      closeModal();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (currentUser) {
    history.push("/");
  }

  const handleVideoEnded = () => {
    videoRef.current.play();
  };

  return (
    <div className="whole-login">
    <>
      <div className="bglogin">
  <div className="slogan-overlay">
    bringing homemade comfort to your doorstep!
  </div>
  <video
    className="bglogin-video"
    src={bglogin}
    ref={videoRef}
    onEnded={handleVideoEnded}
    autoPlay
    muted
    loop
  />
</div>

<div className="overlay-login">
  <h3 className="login-h1"> join our community</h3>
  <form className="login-form" onSubmit={handleSubmit}>
    {errors.length > 0 && (
      <ul className="error-messages">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
    )}
    <label>
      Username or Email:
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
      Password:
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
      Demo User
    </button>

    <OpenModalMenuItem
      className="signup-button-home"
      itemText="Sign Up"
      modalComponent={<SignupFormModal />}
    />
  </form>
</div>

    </>
    </div>
  );
}

export default LoginFormModal;
