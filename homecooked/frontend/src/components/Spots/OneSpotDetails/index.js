import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getOneSpotThunk } from "../../../store/spots";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import { useParams } from "react-router-dom";
import { getSpotsReviewsThunk } from "../../../store/reviews";
import CreateReview from "../../Reviews/CreateReview";
import "./OneSpotDetails.css";
import DeleteOneReview from "../../Reviews/DeleteReview";

const OneSpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const { [spotId]: spotDetailsValues } = useSelector((state) => state?.spots);
  const allReviews = useSelector((state) => state?.reviews);
  const reviews = Object?.values(allReviews);
  const user = useSelector((state) => state?.session?.user);
  const starIcon = "\u2605";

  const reviewOwner = reviews?.find((review) => review?.User?.id === user?.id);
  

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
    dispatch(getSpotsReviewsThunk(spotId));
  }, [dispatch, JSON?.stringify(spotId), JSON?.stringify(reviewOwner)]);

  if (!spotDetailsValues) {
    return null;
  }

  if (!spotId) {
    return null
  }

  return (
    <div className="page-wrapper-one-spot">
      <h1 className="spots-h1">{spotDetailsValues?.name}</h1>
      <div className="spot-details-address">{`${spotDetailsValues?.city}, ${spotDetailsValues?.state}, ${spotDetailsValues?.country}`}</div>
      <div className="spot-detail-pics">
        {spotDetailsValues?.SpotImages?.map(
          (spotImage) =>
            spotImage && (
              <img
                key={spotImage?.id}
                className="spot-detail-image"
                src={spotImage?.url}
                alt="spot-pic"
              />
            )
        )}
      </div>
      <h3>
        Hosted by{" "}
        {`${spotDetailsValues?.Owner?.firstName} ${spotDetailsValues?.Owner?.lastName}`}
      </h3>

      <div
        className="reviews-given"
        value={spotDetailsValues?.description}
        readOnly
      >
        {spotDetailsValues?.description}
      </div> 
      <br></br>

      <div className="dividing-line"> </div>
      <div className="pop-up-reservation">
        {reviews?.length === 0 ? (
          <div className="pricefornight">
            {" "}
            <span>
              {" "}
              ${Number(spotDetailsValues?.price)?.toFixed(2)}/ night
            </span>{" "}
            {starIcon} New
          </div>
        ) : reviews?.length === 1 ? (
          <div>
            <span>
              {" "}
              ${Number(spotDetailsValues?.price)?.toFixed(2)}/ night{" "}
            </span>{" "}
            {starIcon} {Number(spotDetailsValues?.avgStarRating)?.toFixed(1)} ·{" "}
            {spotDetailsValues?.numReviews} Review
          </div>
        ) : (
          <div className="review-and-stars">
            <span>
              {" "}
              ${Number(spotDetailsValues?.price)?.toFixed(2)} per night
            </span>{" "}
            &#9733; {Number(spotDetailsValues?.avgStarRating)?.toFixed(1)} ·{" "}
            {spotDetailsValues?.numReviews} Reviews{" "}
          </div>
        )}
        {/* ${spotDetailsValues?.price}{" "}
          {reviews?.length === 0 ? "per night" : "/night"}
          <div className="reviews-and-star">
            &#9733;
            {reviews?.length === 0 ||
            typeof spotDetailsValues?.avgRating !== "number"
              ? " New"
              : ` ${spotDetailsValues?.avgRating} ${starIcon} · ${
                  spotDetailsValues?.numReviews
                } ${reviews?.length === 1 ? "Review" : "Reviews"}`} */}
        {/* </div> */}

        <button
          type="reserve-button"
          onClick={() => alert("Feature coming soon!")}
          className="reserve-button"
        >
          Reserve
        </button>
      </div>

      <div className="spot-review-details">
        <h2>
          {reviews?.length === 0 ? (
            <div>{starIcon} New</div>
          ) : reviews?.length === 1 ? (
            <div>
              {" "}
              &#9733; {Number(spotDetailsValues?.avgStarRating).toFixed(
                1
              )} · {spotDetailsValues?.numReviews} Review{" "}
            </div>
          ) : (
            <div>
              {" "}
              {starIcon} {Number(spotDetailsValues?.avgStarRating).toFixed(1)} ·{" "}
              {spotDetailsValues?.numReviews} Reviews{" "}
            </div>
          )}
        </h2>
        <div className="post-review"></div>
        <div className="create-review-form-div">
          {user?.id !== spotDetailsValues?.ownerId && !reviewOwner && user ? (
            <button className="create-review-button">
              <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={<CreateReview spotId={spotDetailsValues?.id} />}
              />
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="all-reviews">
          {reviews?.length ? (
            reviews
              .sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
              ?.map((review) => (
                <div className="review-details">
                  <ul>
                    <div className="review-name">
                      <li>{review?.User?.firstName} </li>
                    </div>
                    <div className="review-date">
                      <li>
                        {new Date(review?.createdAt)?.toLocaleDateString(
                          "en-US",
                          { month: "long", year: "numeric" }
                        )}
                      </li>{" "}
                    </div>
                    <li>{review?.review}</li>
                    {user?.id === review?.userId ? (
                      <div className="delete-your-review-button">
                        <OpenModalMenuItem
                          itemText="Delete Your Review"
                          className="delete-your-review-button"
                          modalComponent={
                            <DeleteOneReview reviewId={review?.id} />
                          }
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>
              ))
          ) : user?.id &&
            reviews?.length === 0 &&
            user?.id !== spotDetailsValues?.Owner?.id ? (
            <p>Be the first to post a review!</p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneSpotDetails;
