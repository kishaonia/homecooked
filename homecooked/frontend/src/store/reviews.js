import { csrfFetch } from "./csrf";

export const GET_ALLSPOTSREVIEWS = 'reviews/GET_ALLSPOTSREVIEWS'
export const POST_ONEREVIEW = 'reviews/POST_ONEREVIEW'
export const DELETE_ONEREVIEW = 'reviews/DELETE_ONEREVIEW'

export const allSpotsReviewsAction = reviews => ({
    type: GET_ALLSPOTSREVIEWS,
    reviews
})

export const createReviewAction = review => ({
    type: POST_ONEREVIEW,
    review
})

export const deleteOneReviewAction = reviewId => ({
    type: DELETE_ONEREVIEW,
    reviewId
})


export const getSpotsReviewsThunk = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const newReview = await response.json();
        dispatch(allSpotsReviewsAction(newReview))
    }
}
export const deleteOneReviewThunk = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const deleteReview = await response.json();
        dispatch(deleteOneReviewAction(reviewId))
    }
}
export const createReviewThunk = (reviewData, spotId) => async dispatch => {
    let response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(reviewData)
    })

    if (response.ok) {
        const reviewCreated = response.json()
        dispatch(createReviewAction(reviewCreated))
   
    }
   
}

const initialState = {

}
// export const deleteReviewThunk = (reviewId) => async dispatch =>
// const initialState = {

// }
const reviewsReducer = (state= initialState, action) => {
let newReviewsState;
switch(action.type) {
case GET_ALLSPOTSREVIEWS:
    newReviewsState={};
    action.reviews?.Reviews?.forEach(review => {
        newReviewsState[review.id] = review
    })
    return newReviewsState;
case DELETE_ONEREVIEW:
    newReviewsState={...state}
    delete newReviewsState[action.reviewId]
    return newReviewsState
case POST_ONEREVIEW:
    newReviewsState={...state};
    newReviewsState[action.review.id] = action.review
    return newReviewsState
default: return state
}
} 

export default reviewsReducer