import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ user }) {
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
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const demoSignIn = (e) => {
    e.preventDefault();
    const password = "password5"
    const credential = "demouser@gmail.com"
    dispatch(sessionActions?.login({ credential, password }));
    closeMenu();
  }

  const ulClassName = "profile-dropdown" + (showMenu ? " show" : "" ) ;

  return (
    <>
      <button onClick={openMenu} className="drop-down-menu">
        <i className="fa fa-bars" aria-hidden="true"></i>
        <i className="fa fa-user-circle-o"></i>
      </button>
      <div className="profile-menu">
        <ul className={ulClassName} ref={ulRef}> 
          {user ? (
            <>
              <li>
                Hello, {user?.firstName}!
              </li>
              <li>{user?.email}</li>
            
              <div className='dividing-line'> </div>
                <NavLink exact to="/spots/current">
                  Manage Your Spots
                </NavLink>
              
            
              <li>
              <div className='dividing-line'> </div>
            
                <button className="button-logout" onClick={logout}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              {!user && (
                <button onClick={demoSignIn} type="submit" id='demo-user-button'>
                  Log in as Demo User
                </button>
              )}
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
