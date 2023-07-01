import { csrfFetch } from "./csrf";

const GET_ALLSPOTS = "spots/GET_AllSPOTS"
const GET_ONESPOT = "spots/GET_ONESPOT"
const GET_CURRENTUSERSPOTS = "spots/GET_CURRENTUSERSPOTS"
const POST_ONESPOT = "spots/POST_ONESPOT"
const PUT_ONESPOT = "spots/PUT_ONESPOT"
const DELETE_ONESPOT = "spots/DELETE_ONESPOT"

export const getAllSpotsAction = (spots) => ({
    type: GET_ALLSPOTS,
    spots
});

export const getCurrentUserSpotsAction = (spots) => ({
    type: GET_CURRENTUSERSPOTS,
    spots
})

export const getOneSpot = (spot) => ({
    type: GET_ONESPOT,
    spot
    
});

export const deleteSpotAction = (spotId) => ({
    type:DELETE_ONESPOT,
    spotId
})

export const createSpotAction = (spot) => ({
    type: POST_ONESPOT,
    spot
})

export const editSpotAction = (spot) => ({
    type: PUT_ONESPOT,
    spot
})

export const getAllSpotsThunk = () => async dispatch => {
    const res = await fetch('/api/spots')
    if (res.ok) {
        const spots = await res.json()
        dispatch(getAllSpotsAction(spots))
    }
};

export const getCurrentUserSpotsThunk = () => async dispatch => {
    const res = await csrfFetch('/api/spots/current')
    if (res.ok) {
        const currentSpots = await res.json();
        dispatch(getCurrentUserSpotsAction(currentSpots))
    }
}

export const getOneSpotThunk = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}`);
    // console.log('get one spot', res)
    if (res.ok) {
        const details = await res.json();
        dispatch(getOneSpot(details))
    }
}

export const deleteOneSpotThunk = (spotId) => async dispatch => {
const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
})
if (response.ok) {
    // const deleteSpot = await response.json()
    dispatch(deleteSpotAction(spotId))
}
}

export const editSpotThunk = (spot, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })
    if (response.ok) {
       const editSpotThunk = await response.json()
        await dispatch(editSpotAction(editSpotThunk))
    }   
    return editSpotThunk

}
// export const createOneSpotThunk = (spot, images) => async dispatch => {
// const res = await csrfFetch('/api/spots', {
//     method: 'POST',
//     headers: {'Content-Type': 'application'}, 
//     body: JSON.stringify(spot)
    
// })
// const spotOne = await res.json()
// if (spotOne) {
//     const res2 = await csrfFetch('/api/spots/${spotOne.id}/images', {
//         method: 'POST',
//         body: JSON.stringify(images)
//     })
//    const imageCreated = res2.json()
//    dispatch(createSpotAction(spotOne, imageCreated))
// }
// return spotOne
// }
export const createOneSpotThunk = (spot, images) => async dispatch => {
    // const {address, city, state, lat, lng, country, name, description, price} = spot
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify({address, city, state, lat, lng, country, name, description, price})
        body: JSON.stringify(spot)
       

    })
    const spotCreated = await res.json()
    spotCreated['SpotImages'] = []
    if (res.ok) {
        // spotCreated['SpotImages'] = []
     //by looking at back end found out that need to assign spot images as an empty array to make it dynamic
    for (let i = 0; i < images.length; i++) {
        const res2 = await csrfFetch(`/api/spots/${spotCreated.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(images[i])
        });
        const image = await res2.json()
        if (res2.ok) {
            spotCreated.SpotImages.push(image)
        }
        // dispatch(createSpotAction(spotCreated))
    }
    // return spotCreated
        dispatch(createSpotAction(spotCreated))
        return spotCreated
    }
    // dispatch(createSpotAction(spotCreated))
    // return spotCreated
}

const initialState = {

}

//const initialState = {
   //spots={}
   //spot={} 
// }

const spotsReducer = (state = initialState, action) => {
    let newSpotsState;
    switch(action.type) {
        // case GET_ALLSPOTS:
            //action.spots.Spots.forEach((spot) => (newSpotsState))
            //newSPotsState = {...state, spots:{...state.spots}}
            //return newSpotsState
        case GET_ALLSPOTS:
            newSpotsState = {};
            action.spots.Spots.forEach(spot => {
                newSpotsState[spot.id] = spot
            })
            // console.log('new state', newSpotsState)
            return newSpotsState;
        case GET_CURRENTUSERSPOTS:
            newSpotsState = {};
            action?.spots?.Spots?.forEach(spot => {
             newSpotsState[spot.id] = spot  
            })
            //console.log('new state 3', newSpotsState)
            return newSpotsState
        // case GET_ONESPOT:
        // newSpotsState = {...state, spot: {...state.spot} }
        //newSpotsState.spot = action.spot
        //return newSpotsState
        case GET_ONESPOT:
            newSpotsState = {...state};
            newSpotsState[action.spot.id] = action.spot;
            return newSpotsState
            // console.log('new state 2', newSpotsState)
        case POST_ONESPOT:
            newSpotsState = { ...state };
            newSpotsState[action.spot.id] = action.spot;
            return newSpotsState;
        case PUT_ONESPOT:
            newSpotsState = {...state};
            newSpotsState[action.spot.id] = action.spot
            return newSpotsState
        case DELETE_ONESPOT:
            newSpotsState = {...state};
          delete  newSpotsState[action.spotId]
          return newSpotsState
        default:
            return state
    }
}

export default spotsReducer