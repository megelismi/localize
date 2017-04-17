
export const GET_USERS_WITH_REVIEWS_ERROR = 'GET_USERS_WITH_REVIEWS_ERROR';  
export const getUsersWithReviewsError = error => ({
  type: GET_USERS_WITH_REVIEWS_ERROR, 
  error
});

export const GET_USERS_WITH_REVIEWS_SUCCESS = 'GET_USERS_WITH_REVIEWS_SUCCESS'; 
export const getUsersWithReviewsSuccess = users => ({
  type: GET_USERS_WITH_REVIEWS_SUCCESS, 
  users
});

export const GET_LOCATIONS_FOR_CITY_ERROR = 'GET_LOCATIONS_FOR_CITY_ERROR'; 
export const getLocationsForCityError = error => ({
  type: GET_LOCATIONS_FOR_CITY_ERROR, 
  error
});

export const GET_LOCATIONS_FOR_CITY_SUCCESS = 'GET_LOCATIONS_FOR_CITY_SUCCESS'; 
export const getLocationsForCitySuccess = locations => ({
  type: GET_LOCATIONS_FOR_CITY_SUCCESS, 
  locations
});

export const GET_CURRENT_USER_LOCATIONS_AND_REVIEWS_ERROR = 'GET_CURRENT_USER_LOCATIONS_AND_REVIEWS_ERROR';
export const getCurrentUserLocationsAndReviewsError = error => ({
  type: GET_CURRENT_USER_LOCATIONS_AND_REVIEWS_ERROR, 
  error
});

export const GET_CURRENT_USER_LOCATIONS_AND_REVIEWS_SUCCESS = 'GET_CURRENT_USER_LOCATIONS_AND_REVIEWS_SUCCESS';
export const getCurrentUserLocationsAndReviewsSuccess = locationsAndReviews => ({
	type: GET_CURRENT_USER_LOCATIONS_AND_REVIEWS_SUCCESS, 
	locationsAndReviews
});
