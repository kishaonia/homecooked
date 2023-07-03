import { csrfFetch } from './csrf';


const SET_USER_BUY = 'session/setUserBuy';
const REMOVE_USER_BUY = 'session/removeUserBuy';

const setUser = (userBuy) => {
  return {
    type: SET_USER_BUY,
    payload: userBuy,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER_BUY,
  }
};


export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session/', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUserBuy = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const buyerSignUp = (user) => async (dispatch) => {
  const { username,
    firstName,
    lastName,
    password,
    DOB,
    address,
    profilephoto,
     } = user;
  const response = await csrfFetch("/api/usersBuys", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      password,
      DOB,
      address,
      profilephoto,
      
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER_BUY:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER_BUY:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};



export default sessionReducer;
