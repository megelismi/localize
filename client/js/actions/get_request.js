import * as get_result from './get_result.js';
import * as post_result from './post_result.js';

export const getAllLocationsForCity = () => dispatch => {
  return fetch('/locations/city/1/')
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText); 
    }
    return res.json(); 
  }).then(locations => {
    dispatch(get_result.getLocationsForCitySuccess(locations)); 
  }).catch(err => {
    dispatch(get_result.getLocationsForCityError(err)); 
  });
};

export const getCurrentUserLocationsAndReviews = userId => dispatch => {
  return fetch(`/locations/reviews/city/:city_id/${userId}`)
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText); 
    }
    return res.json(); 
  }).then(users => {
    dispatch(get_result.getCurrentUserLocationsAndReviewsSuccess(users)); 
  }).catch(err => {
    dispatch(get_result.getCurrentUserLocationsAndReviewsError(err)); 
  });
};

export const getUsersWithReviews = () => dispatch => {
  return fetch('/users/city/1')
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText); 
    }
    return res.json(); 
  }).then(users => {
    dispatch(get_result.getUsersWithReviewsSuccess(users)); 
  }).catch(err => {
    dispatch(get_result.getUsersWithReviewsError(err)); 
  });
};

export const findUserFromCookie = token => dispatch => {
  return fetch(`/find/cookie/${token}`)
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  }).then(res => {
    dispatch(post_result.signInUserSuccess(res));
  }).catch(err => {
    dispatch(post_result.signInUserError(err));
  });
};
