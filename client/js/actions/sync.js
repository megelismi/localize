//old
export const SHOW_RELEVANT_USERS_ONLY = 'SHOW_RELEVANT_USERS_ONLY';
export const showRelevantUsersOnly = () => ({
  type: SHOW_RELEVANT_USERS_ONLY
})

//old - not in use?
export const UPDATE_LOCATION_IMAGE = 'UPDATE_LOCATION_IMAGE';
export const updateLocationImage = image => ({
  type: UPDATE_LOCATION_IMAGE,
  image
});

//old
export const UPDATE_LOCATION_IN_LOCALS_MAP = 'UPDATE_LOCATION_IN_LOCALS_MAP';
export const updateLocationInLocalsMap = (user_id = 3, name, lat_long, short = null, long = null, tag_array = null) => ({
  type: UPDATE_LOCATION_IN_LOCALS_MAP,
  user_id,
  name,
  lat_long,
  short,
  long,
  tag_array
});

//old
export const DELETE_LOCATION_FROM_LOCALS_MAP = 'DELETE_LOCATION_FROM_LOCALS_MAP';
export const deleteLocationFromLocalsMap = location => ({
  type: DELETE_LOCATION_FROM_LOCALS_MAP,
  location
});

//old
export const SHOW_MODAL_FUNCTION = 'SHOW_MODAL_FUNCTION';
export const showModalFunction = boolean => ({
  type: SHOW_MODAL_FUNCTION,
  boolean
});

//old
export const SHOW_UPLOAD_MODAL_FUNCTION = 'SHOW_UPLOAD_MODAL_FUNCTION';
export const showUploadModalFunction = boolean => ({
  type: SHOW_UPLOAD_MODAL_FUNCTION,
  boolean
});

//old
export const ADD_LOCATION_TO_LOCALS_MAP = 'ADD_LOCATION_TO_LOCALS_MAP';
export const addLocationToLocalsMap = (user_id, feature, lat_long, short = null, long = null, tag_array = null) => ({
  type: ADD_LOCATION_TO_LOCALS_MAP,
  user_id,
  feature,
  lat_long,
  short,
  long,
  tag_array
});

//////////////////////////////////////////////////////////////////////////

// export const FILTER_LOCATIONS_BY_USER = 'FILTER_LOCATIONS_BY_USER';
// export const filterLocationsByUser = filteredLocations => ({
//   type: FILTER_LOCATIONS_BY_USER,
//   filteredLocations
// });

//new
export const ADD_SELECTED_TAG = 'ADD_SELECTED_TAG';
export const addSelectedTag = tagId => ({
  type: ADD_SELECTED_TAG,
  tagId
});

//new
export const FILTER_LOCATIONS_BY_TAGS = 'FILTER_LOCATIONS_BY_TAGS'; 
export const filterLocationsByTags = filteredLocations => ({
  type: FILTER_LOCATIONS_BY_TAGS, 
  filteredLocations
});

//new
export const FILTER_LOCATIONS_BY_USER = 'FILTER_LOCATIONS_BY_USER';
export const filterLocationsByUser = filteredLocations => ({
  type: FILTER_LOCATIONS_BY_USER,
  filteredLocations
});

export const REMOVE_LOCATION_FROM_MAP = 'REMOVE_LOCATION_FROM_MAP'; 
export const removeLocation = newFilteredLocations => ({
  type: REMOVE_LOCATION_FROM_MAP,
  newFilteredLocations 
});

//new
export const DESELECT_TAG = 'DESELECT_TAG'; 
export const deselectTag = selectedTags => ({
  type: DESELECT_TAG,
  selectedTags 
});

//old - keep 
export const CLEAR_ALL_APPLIED_TAGS = 'CLEAR_ALL_APPLIED_TAGS';
export const clearAllAppliedTags = boolean => ({
  type: CLEAR_ALL_APPLIED_TAGS,
  user_is_selected: boolean
});

//new
export const SELECT_USER = 'SELECT_USER';
export const selectUser = user => ({
  type: SELECT_USER,
  user
});

//old - keep 
export const DESELECT_USER = 'DESELECT_USER';
export const deselectUser = () => ({
  type: DESELECT_USER
});

//old
export const SELECT_LOCATION_BY_ID = 'SELECT_LOCATION_BY_ID';
export const selectLocationById = id => ({
  type: SELECT_LOCATION_BY_ID,
  id
});

//old
export const FILTER_TAGS_BY_SELECTED_LOCATIONS = 'FILTER_TAGS_BY_SELECTED_LOCATIONS';
export const filterTagsBySelectedLocations = () => ({
  type: FILTER_TAGS_BY_SELECTED_LOCATIONS
});

//old
export const FILTER_TAGS_BY_USER = 'FILTER_TAGS_BY_USER';
export const filterTagsByUser = () => ({
  type: FILTER_TAGS_BY_USER
});

//old - keep 
export const SIGN_UP_MODAL = 'SIGN_UP_MODAL';
export const signUpModal = () => ({
  type: SIGN_UP_MODAL
});

//old - keep 
export const SIGN_IN_MODAL = 'SIGN_IN_MODAL';
export const signInModal = () => ({
  type: SIGN_IN_MODAL
});

//old - keep 
export const LOCATIONS_SAVED_MODAL = 'LOCATIONS_SAVED_MODAL';
export const locationsSavedModal = () => ({
  type: LOCATIONS_SAVED_MODAL
})

//old - keep 
export const UPDATE_USER_DETAILS_MODAL = 'UPDATE_USER_DETAILS_MODAL';
export const updateUserDetailsModal = () => ({
  type: UPDATE_USER_DETAILS_MODAL
});

//old - keep 
export const UPDATE_PROFILE_PICTURE_MODAL = 'UPDATE_PROFILE_PICTURE_MODAL';
export const updateProfilePictureModal = () => ({
  type: UPDATE_PROFILE_PICTURE_MODAL
});

//old - keep 
export const TUTORIAL_MODAL = 'TUTORIAL_MODAL';
export const tutorialModal = () => ({
  type: TUTORIAL_MODAL
});

//old 
export const SET_LOCALS_MAP_LOCATIONS = 'SET_LOCALS_MAP_LOCATIONS';
export const setLocalsMapLocations = locations => ({
  type: SET_LOCALS_MAP_LOCATIONS,
  locations
})



export const filterLocations = (locationIds, actionType) => (dispatch, getState) => {
  let allLocations = getState().locations; 
  let filteredLocations = allLocations.filter(location => {
    if (locationIds.indexOf(location.id) !== -1) {
      return location; 
    }
  }); 
  dispatch({
    type: actionType, 
    filteredLocations
  }) 
}; 

export const removeSelectedTag = tagId => (dispatch, getState) => {
  let selectedTags = getState().selectedTags; 
  let index = selectedTags.indexOf(tagId); 
  selectedTags.splice(index, 1); 
  dispatch({
    type: DESELECT_TAG, 
    selectedTags
  })
}

export const removeLocationFromMap = (locationIds, actionType) => (dispatch, getState) => {
  let filteredLocations = getState().filteredLocations; 
  let newFilteredLocations = []; 
  filteredLocations.forEach(location => {
    if (locationIds.indexOf(location.id) === -1) {
      newFilteredLocations.push(location);  
    }
  });
  dispatch({
    type: actionType, 
    newFilteredLocations
  })
 };
// export const selectUserAndUpdateTags = user => (dispatch, getState) => {
//   let selectedUser = getState().selectedUser;
//   let currentUser = getState().currentUser;
//   let selectedUserLocations = getState().selectedUserLocations;
//   dispatch({
//     type: SELECT_USER,
//     user
//   });
//   if (selectedUser !== getState().selectedUser) {
//     dispatch({
//       type: FILTER_LOCATIONS_BY_USER,
//       user
//     });
//   }
//   if (selectedUserLocations !== getState().locationsFilteredByUser) {
//     dispatch({
//       type: FILTER_TAGS_BY_USER
//     });
//   }
//   if (currentUser && getState().locationsFilteredByUser) {
//     let locations = getState().locationsFilteredByUser;
//     dispatch({
//       type: SET_LOCALS_MAP_LOCATIONS,
//       locations
//     })
//   }
// }

