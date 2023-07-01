import { useModal } from "../../../context/Modal";
import { deleteOneReviewThunk } from "../../../store/reviews";
import { useDispatch } from 'react-redux';
// import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";

export default function DeleteOneReview({ reviewId }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const onSubmit = async (e) => {
        e.preventDefault();
       await dispatch(deleteOneReviewThunk(reviewId))
        closeModal()
    }

    const onCancel = (e) => {
        e.preventDefault();
        closeModal();
    }
    return (

        <div className="review-delete-form-div">
            <div className="delete-review-button">Are you sure you want to delete this review?</div>
            <ul className="errors">
                {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
        ))} */}
            </ul>
            <form onSubmit={onSubmit}>
                <div className="delete-review-form">
                    <button type="submit" className="spot-button-delete" id="deleteReview-button" >Yes, Delete This Review</button>
                    <button className="review-delete-button" type="submit" onClick={onCancel}>No, keep this review</button>
                </div>
            </form>
        </div>

    )

} 