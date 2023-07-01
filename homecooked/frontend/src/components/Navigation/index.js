import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import { login } from "../../store/session";
import logoproj from "../../assets/logoproj.jpg";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state?.session?.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalMenuItem
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />

        <OpenModalMenuItem
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <div className="wrapper-navigation">
      <div className="navbar">
        <div className="left-nav-bar">
          <a href="/">
            <img src={logoproj} className="logo-home" height="100px" width="300px" alt="Logo" />
          </a>
        </div>
        <div className="middle-navbar">


          {/* <div className="homepage-input">
            <input
              className="homepage-date-check-in"
              placeholder="Anywhere"
              onFocus="(this.type = 'homepage-date-check-in')"
              type="date"
            ></input>
            <input
              className="homepage-date-check-out"
              placeholder="Any week"
              type="date"
              onFocus="(this.type = 'homepage-date-check-in')">
            </input>
            <input
              className="guest-check-in"
              placeholder="Add Guests"
              type="number">
            </input>
          </div> */}
          <ul >
            <div className="homepage-input-popup">
              <li>Stay</li>
              {/* Add popup search where destinations  STAY */}
              <li>Experiences</li>
              <li>Online Experience</li>
            </div>
          </ul>

        </div>

        <div className="right-nav-bar">

          {sessionUser && isLoaded && (
            <NavLink className="create-spot-link" exact to="/spots/new">
              create a spot
            </NavLink>
          )}

          <button className="profile-button">
            <ProfileButton user={sessionUser} />
          </button>
        </div>


      </div>
      <div className="footer">
 

<div className="kishas-footer">
  <p className="kishas-name">Kisha Onia</p>
  <p className="links-right">
    <a className="linkedin" href="https://www.linkedin.com/in/kisha-onia-63bb35182/" target="_blank">LinkedIn</a>
    <a className="github" href="https://github.com/kishaonia" target="_blank">Github</a>
    <a className="portfolio" href="https://kishaonia.github.io/KishaOnia/" target="_blank">Portfolio</a>
    <a className="email" href="mailto:workwithkisha@gmail.com" target="_blank">Email</a>
  </p>
</div>


      </div>
    </div>
  );
}

export default Navigation;
