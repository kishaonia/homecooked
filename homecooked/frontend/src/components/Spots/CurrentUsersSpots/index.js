// import { getCurrentUserSpotsThunk } from "../../../store/spots";
// import { useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import DeleteOneSpot from "../DeleteOneSpot";
// import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";

// import "./CurrentUserSpots.css";

// const CurrentUserSpots = () => {
//   const dispatch = useDispatch();
//   const allSpotsValues = useSelector((state) => Object?.values(state?.spots));
//   const sessionUser = useSelector((state) => state?.session?.user); // Add this line to define sessionUser

//   useEffect(() => {
//     dispatch(getCurrentUserSpotsThunk());
//   }, [dispatch, JSON?.stringify(allSpotsValues)]);

//   if (!allSpotsValues) {
//     return null;
//   }
//   return (
//     <>
//       <div className="manage-your-spots-create">
//         <div className="createspot-manage">Manage Your Spot</div>

//         {sessionUser && (
//           <NavLink className="create-spot-link-bottom" exact to="/spots/new">
//             Create a Spot
//           </NavLink>
//         )}
//     <div className="current-container">
//       {allSpotsValues?.map((spotValues) => {
//         return (
//           <nav key={spotValues?.id} className="current-Spots">
//             <NavLink
//               className="edit-navContainer"
//               to={`/spots/${spotValues?.id}`}
//             >
//               <div className="edit-navImage">
//                 <img src={spotValues?.previewImage} alt="Preview-Image" />
//               </div>

//               <div className="city-rating">
//                 <span>
//                   {spotValues?.city}, {spotValues?.state}
//                 </span>
//                 {/* <div>$ {spotValues?.price?.toFixed(2)}/ night</div> */}
//                 <span>
//                   &#9733;{" "}
//                   {parseInt(spotValues.avgRating)
//                     ? Number(spotValues?.avgRating).toFixed(1)
//                     : "New"}
//                 </span>
//               </div>
//               <div>$ {spotValues?.price?.toFixed(2)}/ night</div>
//             </NavLink>
//             <div className="update-delete-button">
//               <div>
//                 <button className="update-spot-button">
//                   <NavLink to={`/spots/${spotValues?.id}/edit`}>
//                     Update Spot
//                   </NavLink>
//                 </button>
//                 <button className="delete-spot-button">
//                   <OpenModalMenuItem
//                     itemText="Delete Spot"
//                     modalComponent={<DeleteOneSpot spotId={spotValues?.id} />}
//                   />
//                 </button>
//               </div>
//             </div>
//           </nav>
//         ); 
        
//       }
//        )}
//        </div>
//        </div>
//     </>
//   );
// };

// export default CurrentUserSpots;

import { getCurrentUserSpotsThunk } from "../../../store/spots";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeleteOneSpot from "../DeleteOneSpot";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";

import "./CurrentUserSpots.css";

const CurrentUserSpots = () => {
  const dispatch = useDispatch();
  const allSpotsValues = useSelector((state) => Object?.values(state?.spots));
  const sessionUser = useSelector((state) => state?.session?.user);

  useEffect(() => {
    dispatch(getCurrentUserSpotsThunk());
  }, [dispatch, JSON?.stringify(allSpotsValues)]);

  if (!allSpotsValues) {
    return null;
  }

  return (
    <>
      <div className="manage-your-spots-create">
        <div className="createspot-manage">Manage Your Spot</div>

        {sessionUser && (
          <NavLink className="create-spot-link-bottom" exact to="/spots/new">
            Create a Spot
          </NavLink>
        )}

        <div className="current-container">
          {allSpotsValues.length === 0 ? (
            <div className="no-spots-text">No spots available. </div>
          ) : (
            allSpotsValues.map((spotValues) => (
              <nav key={spotValues?.id} className="current-Spots">
                <NavLink
                  className="edit-navContainer"
                  to={`/spots/${spotValues?.id}`}
                >
                  <div className="edit-navImage">
                    <img src={spotValues?.previewImage} alt="Preview-Image" />
                  </div>

                  <div className="city-rating">
                    <span>
                      {spotValues?.city}, {spotValues?.state}
                    </span>
                    {/* <div>$ {spotValues?.price?.toFixed(2)}/ night</div> */}
                    <span>
                      &#9733;{" "}
                      {parseInt(spotValues.avgRating)
                        ? Number(spotValues?.avgRating).toFixed(1)
                        : "New"}
                    </span>
                  </div>
                  <div>$ {spotValues?.price?.toFixed(2)}/ night</div>
                </NavLink>
                <div className="update-delete-button">
                  <div>
                    <button className="update-spot-button">
                      <NavLink to={`/spots/${spotValues?.id}/edit`}>
                        Update Spot
                      </NavLink>
                    </button>
                    <button className="delete-spot-button">
                      <OpenModalMenuItem
                        itemText="Delete Spot"
                        modalComponent={
                          <DeleteOneSpot spotId={spotValues?.id} />
                        }
                      />
                    </button>
                  </div>
                </div>
              </nav>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CurrentUserSpots;
