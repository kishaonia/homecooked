// frontend/src/App.js

import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import * as sessionSellerActions from "./store/sellerSession";
import * as sessionBuyerActions from "./store/buyerSession";
import { useState, useEffect } from "react";

import CreateSpot from "./components/Spots/CreateSpot";
import EditSpot from "./components/Spots/EditSpot";
import LoginFormModal from "./components/LoginFormModal";

import FeedBuyer from "./components/Spots/Feed";
import FeedSeller from "./components/Spots/Feed/indexSeller";


function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionBuyerActions.restoreUserBuy()).then(() => setIsLoaded(true));
    }, [dispatch]);
    useEffect(() => {
      dispatch(sessionSellerActions.restoreUserSell()).then(() => setIsLoaded(true));
  }, [dispatch]);

    return (
      <>


        {isLoaded && (
          <Switch>
           <Route exact path="/">
              <LoginFormModal />
            </Route>
            <Route exact path="/Feed">
            <Navigation isLoaded={isLoaded} />
              <FeedBuyer />
            </Route>
            <Route exact path="/spots/new">
            <Navigation isLoaded={isLoaded} />
              <CreateSpot />
            </Route>
            <Route exact path="/FeedSeller">
              <FeedSeller />
            </Route>
           
            <Route exact path="/spots/:spotId/edit">
            <Navigation isLoaded={isLoaded} />
              <EditSpot />
            </Route>
          </Switch>
        )}
        {!isLoaded && (
          <Switch>
            {/* <Route exact path="/spots/:spotId">
              Unable to retrieve details. Please try again shortly!
            </Route> */}
            {/* <Route exact path="/">
              Unable to retrieve spots. Please try again shortly!
            </Route> */}
            {/* <Route exact path="/spots/:spotId">
              Unable to retrieve details. Please try again shortly!
            </Route> */}
          </Switch>
        )}
      </>
    );
}

export default App;
