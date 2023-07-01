

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAllSpotsThunk } from "../../../store/spots";
import "./SpotsHomePage.css";
import { useState } from "react";

const SpotsHomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allSpots = useSelector((state) => state?.spots);
  const allSpotsValues = Object?.values(allSpots);
  const starIcon = "\u2605";
  const [showPrice, setShowPrice] = useState(false);

  const handleClick = () => {
    setShowPrice(!showPrice);
  };

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!allSpotsValues) {
    return null;
  }

  return (
    <div className="all-spots-homepage">
      <div className="toggledButtonForPrice">
        Display total price
        Includes all fees, before taxes
        <label className="switch">
          <input type="checkbox" id="toggleButton" onClick={handleClick} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="home-page-body">
        {allSpotsValues?.map((spotValues) => {
          return (
            <NavLink
              key={spotValues?.id}
              className="navContainer"
              to={`/spots/${spotValues?.id}`}
            >
              <div className="navImageHome">
                <div className="data-tool-tip">
                  <span>{spotValues?.name}</span>
                </div>
                <img src={spotValues?.previewImage} alt="Preview-Image" />
              </div>
              <div className="navSpotDetails">
                <div className="city-rating">
                  <span>
                    {spotValues?.city}, {spotValues?.state}
                  </span>
                  <span>
                    {starIcon}{" "}
                    {parseInt(spotValues.avgRating)
                      ? Number(spotValues?.avgRating).toFixed(1)
                      : "New"}
                  </span>
                </div>
                {showPrice && (
                  <div className="price-to-toggle">
                    $ {spotValues?.price?.toFixed(2)} / night
                  </div>
                )}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default SpotsHomePage;
