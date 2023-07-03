

// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useRef } from "react";

// const FeedBuyer = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();
//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };
//   useEffect(() => {
//     if (!showMenu) return;
//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const closeMenu = () => setShowMenu(false);

//   // const buyernav = (e) => {
//   //   e.preventDefault();
//   //   // dispatch(sessionBuyerActions.logout());
//   //   closeMenu();
//   // };

//   return (
//     <div className="Feed-Buyer">
//       <div className="feed-buyer-whole">
//         <div className="feed-buyer-right">
//         <button onClick={openMenu} className="button-feed-buyer-right">
//         <i className="fa fa-bars" aria-hidden="true"></i>
//       </button>
//         </div>
//         <div className="feed-buyer-middle"></div>
//         <div className="feed-buyer-left"> 
//         <button onClick={openMenu} className="button-feed-buyer-right">
//         <i className="fa fa-bars" aria-hidden="true"></i>
//       </button>
//         </div>



//       </div>
      
//     </div>
//   );
// };

// export default FeedBuyer;


import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import "./Feed.css";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import Story from "../../Navigation/AboutUs";
import * as sessionBuyerActions from "../../../store/buyerSession";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Upload from "../../src/Upload";



const FeedBuyer = () => {
  const [showMenuLeft, setShowMenuLeft] = useState(false);
  const [showMenuRight, setShowMenuRight] = useState(false);
  const ulRefLeft = useRef();
  const ulRefRight = useRef();
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


  const openMenuLeft = () => {
    if (showMenuLeft) return;
    setShowMenuLeft(true);
  };

  const openMenuRight = () => {
    if (showMenuRight) return;
    setShowMenuRight(true);
  };

  useEffect(() => {
    if (!showMenuLeft) return;
    const closeMenuLeft = (e) => {
      if (!ulRefLeft.current.contains(e.target)) {
        setShowMenuLeft(false);
      }
    };

    document.addEventListener("click", closeMenuLeft);

    return () => document.removeEventListener("click", closeMenuLeft);
  }, [showMenuLeft]);

  useEffect(() => {
    if (!showMenuRight) return;
    const closeMenuRight = (e) => {
      if (!ulRefRight.current.contains(e.target)) {
        setShowMenuRight(false);
      }
    };

    document.addEventListener("click", closeMenuRight);

    return () => document.removeEventListener("click", closeMenuRight);
  }, [showMenuRight]);

  const closeMenuLeft = () => setShowMenuLeft(false);
  const closeMenuRight = () => setShowMenuRight(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionBuyerActions.logout());
    history.push("/");
  };

  useEffect(() => {
    const input = document.getElementById("pac-input");
    const autocomplete = new window.google.maps.places.Autocomplete(input);
  }, []);


  return (
    <div className="Feed-Buyer">
      <div className="feed-buyer-whole">
        
        <div className="feed-buyer-right">
          <button onClick={openMenuRight} className="button-feed-buyer-right">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
          {showMenuRight && (
            <div
              ref={ulRefRight}
              className="menu-left"
              style={{
                width: "20vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                backgroundColor: "white",
              }}
            >
              <div className="right-menu-buyer">
                <div className="menu-side-nav"> Help</div>
                <div className="menu-side-nav"> Wallet</div>
                <div className="menu-side-nav"> Receipts</div>
                <div className="menu-side-nav"> Activity</div>


                <OpenModalMenuItem
          itemText="About Us"
          modalComponent={<Story/>}
          />  
            <button className="button-logout" onClick={logout}>
                  Log Out
                </button>
              </div>
             
      
            </div>
          )}
        </div>
        
        <a className="logo-homecooked"href="/Feed">
           homecooked!
          </a>
          <input
            className="Address-Feed"
            id="pac-input"
            placeholder="Delivering to...."
            autoComplete="address"
            // type="text-signup"
            required
          />
        <div className="feed-buyer-left">
          <button onClick={openMenuLeft} className="button-feed-buyer-right">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
          {showMenuLeft && (
            <div
              ref={ulRefLeft}
              className="menu-right"
              style={{
                width: "20vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                right: 0,
                backgroundColor: "white",
              }}
            >
<ul className="left-menu-buyer">
                <li className="menu-side-nav"> Past Order</li>
                {/* <li className="menu-side-nav"> Wallet</li>
                <li className="menu-side-nav"> About Us</li> */}
              </ul>         </div>
          )}
        </div>
      </div>
      <div className="feed-buyer-middle">
        <label className="question-feed-buyer">What are you craving for today?</label>
        <input 
        className="fakeaddress"
        placeholder="Filipino, Chinese, Greek etc"
        type="text">

        </input>
   
      </div>
<Upload/>    </div>
  );
};

export default FeedBuyer;
