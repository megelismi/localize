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

//new
export const RESET_LOCATIONS = 'RESET_LOCATIONS';
export const resetLocations = () => ({
  type: RESET_LOCATIONS
});

//new
export const CLEAR_ALL_APPLIED_TAGS = 'CLEAR_ALL_APPLIED_TAGS';
export const clearAllAppliedTags = () => ({
  type: CLEAR_ALL_APPLIED_TAGS
})

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

//new
export const DESELECT_TAG = 'DESELECT_TAG'; 
export const deselectTag = selectedTags => ({
  type: DESELECT_TAG,
  selectedTags
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

export const removeSelectedTag = (tagId, locationIds) => (dispatch, getState) => {

  let selectedTags = getState().selectedTags; 
  let index = selectedTags.indexOf(tagId); 
  selectedTags.splice(index, 1); 
  dispatch({
    type: DESELECT_TAG, 
    selectedTags
  })
}

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


