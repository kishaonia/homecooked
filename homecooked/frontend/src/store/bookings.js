import { csrfFetch } from "./csrf";

const CREATE_BOOKING = 'bookings/createBooking';
const UPDATE_BOOKING = 'bookings/updateBooking';
const DELETE_BOOKING = 'bookings/deleteBooking';
const GET_BOOKINGS = 'bookings/getBookings';

const getBookings = (bookings) => {
  return {
  type: GET_BOOKINGS,
  bookings
  }
}
 const createBooking = (booking) => {
  return {
  type: CREATE_BOOKING,
  booking
}
 };
const updateBooking = (booking) => {
  return{
  type: UPDATE_BOOKING,
  booking
}
};
 const deleteBooking = (bookingId) => {
  return {
  type: DELETE_BOOKING,
  bookingId
}
 };

// Thunks
export const fetchBookings = () => async (dispatch) => {
  const res = await fetch(`/api/bookings`);
  if (res.ok) {
    const bookings = await res.json();
    dispatch(getBookings(bookings));
  }
};

export const createBookingRequest = (booking, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });

  if (response.ok) {
    const success = await response.json();
    success.userId = userId;
    dispatch(createBooking(success));
    return success;
  }
};

export const updateBookingRequest = (booking, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });

  if (response.ok) {
    const updated = await response.json();
    dispatch(updateBooking(updated));
    return updated;
  }
};

export const deleteBookingRequest = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteBooking(bookingId));
  }
};


const bookingReducer = (prevState = {}, action) => {
  let nextState;
  switch (action.type) {
    case GET_BOOKINGS:
    nextState = {}
    action.bookings.Bookings.forEach(booking => {
      nextState[booking.id] = booking
    })
    return nextState
    case CREATE_BOOKING:
    nextState = {...prevState}
    nextState[action.booking.id] = action.booking
      return nextState;
    case UPDATE_BOOKING:
    nextState = {...prevState}
    nextState[action.booking.id] = action.booking
    return nextState;
    case DELETE_BOOKING:
    nextState = {...prevState}
    delete nextState[action.bookingId]
    return nextState;
    default:
      return prevState;
  }
};

export default bookingReducer;




