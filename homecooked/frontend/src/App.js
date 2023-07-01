// frontend/src/App.js
import React,
{ useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/sellerSession";
import SpotsHomePage from "./components/Spots/SpotsHomePage";
import OneSpotDetails from "./components/Spots/OneSpotDetails";
import CurrentUserSpots from "./components/Spots/CurrentUsersSpots";
import CreateSpot from "./components/Spots/CreateSpot";
import EditSpot from "./components/Spots/EditSpot";
import LoginFormModal from "./components/LoginFormModal";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
      <>


        {isLoaded && (
          <Switch>
           <Route exact path="/">
              <LoginFormModal />
            </Route>
            <Route exact path="/spots/current">
            <Navigation isLoaded={isLoaded} />
              <CurrentUserSpots />
            </Route>
            <Route exact path="/spots/new">
            <Navigation isLoaded={isLoaded} />
              <CreateSpot />
            </Route>
            <Route exact path="/spots/:spotId">
            <Navigation isLoaded={isLoaded} />
              <OneSpotDetails />
            </Route>
            <Route exact path="/spots/:spotId/edit">
            <Navigation isLoaded={isLoaded} />
              <EditSpot />
            </Route>
          </Switch>
        )}
        {!isLoaded && (
          <Switch>
            <Route exact path="/spots/:spotId">
              Unable to retrieve details. Please try again shortly!
            </Route>
            <Route exact path="/">
              Unable to retrieve spots. Please try again shortly!
            </Route>
            {/* <Route exact path="/spots/:spotId">
              Unable to retrieve details. Please try again shortly!
            </Route> */}
          </Switch>
        )}
      </>
    );
}

export default App;
