import React from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";
import * as sessionBuyerActions from "../../store/buyerSession";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ProfileButton.css";
import { useRef, useEffect } from "react";
import OpenModalMenuItem from "./OpenModalMenuItem";
import Story from "./AboutUs";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionBuyerActions.logout());
    closeMenu();
    history.push("/");
  };

  const demoSignInBuyer = (e) => {
    e.preventDefault();
    const password = "password"
    const credential = "janedoe"
    dispatch(sessionBuyerActions?.login({ credential, password }));
    closeMenu();
  }

  
  return (
    <div className="wrapper-navigation">
      <div className="navbar">
        <div className="left-nav-bar">
          {/* <a href="/">
           homecooked!
          </a> */}
          
        </div>
        <div className="middle-navbar">


         

        </div>



      </div>
      {/* <div className="footer"> */}

{/* 
<div className="kishas-footer">
  <p className="kishas-name">Kisha Onia</p>
  <p className="links-right">
    <a className="linkedin" href="https://www.linkedin.com/in/kisha-onia-63bb35182/" target="_blank">LinkedIn</a>
    <a className="github" href="https://github.com/kishaonia" target="_blank">Github</a>
    <a className="portfolio" href="https://kishaonia.github.io/KishaOnia/" target="_blank">Portfolio</a>
    <a className="email" href="mailto:workwithkisha@gmail.com" target="_blank">Email</a>
  </p>
</div> */}


      </div>
    // </div>
  );
}

export default Navigation;
