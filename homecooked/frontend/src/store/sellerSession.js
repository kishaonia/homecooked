import { csrfFetch } from './csrf';


const SET_USER_SELL = 'session/setUserSell';
const REMOVE_USER_SELL = 'session/removeUserSell';

const setUser = (userSell) => {
  return {
    type: SET_USER_SELL,
    payload: userSell,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER_SELL,
  }
};


export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session/seller', {
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

export const restoreUserSell = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const sellerSignUp = (user) => async (dispatch) => {
  const { username,
    firstName,
    lastName,
    password,
    DOB,
    address,
    profilephoto,
    specialty } = user;
  const response = await csrfFetch("/api/usersSells", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      password,
      DOB,
      address,
      profilephoto,
      specialty
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
    case SET_USER_SELL:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER_SELL:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};



export default sessionReducer;
