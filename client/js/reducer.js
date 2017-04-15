import * as get_actions from './actions/get_result';
import * as post_actions from './actions/post_result';
import * as put_actions from './actions/put_result';
import * as sync_actions from './actions/sync';
import * as reviewHandlers from './actions/handlers/review_handlers'; 

const state = (state = {
  selectedTags: [],
  mapzenSelectedResults: [],
  signUpModalOpen: false,
  signInModalOpen: false,
  updateProfilePictureModalOpen: false,
  editLocationDetailModal: false,
  showUploadModal: false,
  tutorialModalOpen: false, 
  locationsSavedModalOpen: false, 
  selectedLocation: null, 
  currentUserLocationsAndReviews: []
}, action) => {
  switch (action.type) {

    case sync_actions.ADD_LOCATION_TO_LOCALS_MAP:
    return Object.assign({}, state,
      { currentUserLocationsAndReviews: [{
        user_id: action.user_id,
        short_description: action.short,
        long_description: action.long,
        saved: false,
        locationInfo: {
          name: action.feature.properties.name,
          lat_long: action.lat_long,
          city_id: 1,
          tags: action.tag_array
        }
      }, ...state.currentUserLocationsAndReviews] });

    case sync_actions.ADD_SELECTED_TAG:
    return Object.assign({}, state, { selectedTags: [...state.selectedTags, action.tagId] });

    case sync_actions.CLEAR_ALL_APPLIED_TAGS: 
    return Object.assign({}, state, { selectedTags: [] });

    case post_actions.CREATE_NEW_USER_ERROR:
    return Object.assign({}, state, {
      userError: true,
      signUpUserError: action.error
    });

    case post_actions.CREATE_NEW_USER_SUCCESS:
    return Object.assign({}, state, {
      currentUser: action.user,
      signUpUserError: false,
      signUpModalOpen: false,
      followUpModalOpen: true
    });

    case sync_actions.DELETE_REVIEW_FROM_REDUX_STORE: 
      const updatedLocationsAndReviews = reviewHandlers.deleteReviewFromReduxStore(action.review, [...state.currentUserLocationsAndReviews]);
    return Object.assign({}, state, { currentUserLocationsAndReviews: updatedLocationsAndReviews });

    case sync_actions.DESELECT_TAG: 
    return Object.assign({}, state, { selectedTags: action.selectedTags });

    case sync_actions.DESELECT_USER:
    return Object.assign({}, state, {
      selectedUser: null,
      filteredLocations: state.locations,
      tagsFilteredByUser: null
    });

    case sync_actions.EDIT_LOCATION_DETAIL_MODAL:
    return Object.assign({}, state, { editLocationDetailModal: action.boolean });

    case get_actions.GET_CURRENT_USER_LOCATIONS_AND_REVIEWS_SUCCESS: 
    return Object.assign({}, state, { currentUserLocationsAndReviews: action.locationsAndReviews }); 

    case get_actions.GET_LOCATIONS_FOR_CITY_SUCCESS:
    return Object.assign({}, state, { locations: action.locations, filteredLocations: action.locations });

    case post_actions.GET_LOCATIONS_FOR_TAGS_SUCCESS: 
    return Object.assign({}, state, { filteredLocations: action.filteredLocations });

    case post_actions.GET_SELECTED_LOCATION_REVIEWS_SUCCESS: 
      const relevantUsersCopy = [...state.relevantUsers];
      const reviews = reviewHandlers.addUserObjectsToReviews(action.reviews.reviews, relevantUsersCopy); 
    return Object.assign({}, state, { selectedLocationName: action.reviews.locationName, selectedLocationReviews: reviews });

    case post_actions.GET_RELEVANT_TAGS_SUCCESS:
    return Object.assign({}, state, { tags: action.tags });

    case sync_actions.GET_SEARCH_RESULTS:
    return Object.assign({}, state,
      { mapzenSelectedResults: [...state.mapzenSelectedResults,
        { feature: action.feature, lat_long: action.lat_long }] }
    );

    case get_actions.GET_USERS_WITH_REVIEWS_SUCCESS: 
    return Object.assign({}, state, { relevantUsers: action.users });

    case sync_actions.FILTER_LOCATIONS_BY_USER:
    return Object.assign({}, state, { filteredLocations: action.filteredLocations });

    case sync_actions.LOCATIONS_SAVED_MODAL:
    return Object.assign({}, state, { locationsSavedModalOpen: !state.locationsSavedModalOpen });

    case post_actions.LOG_OUT_ERROR:
    return Object.assign({}, state, {
      logOutError: true
    });

    case post_actions.LOG_OUT_SUCCESS:
    return Object.assign({}, state, {
      currentUser: undefined,
      logOutError: false,
      localsMapLocations: [],
      selectedUser: null,
      locationsFilteredByUser: []
    });

    case sync_actions.REMOVE_LOCATION_FROM_MAP:
    return Object.assign({}, state, { filteredLocations: action.newFilteredLocations });

    case sync_actions.RESET_LOCATIONS: 
    return Object.assign({}, state, { filteredLocations: state.locations });

    case post_actions.SAVE_MAP_SUCCESS:
    return Object.assign({}, state, { saveMapSuccess: true });

    case post_actions.SAVE_MAP_ERROR:
    return Object.assign({}, state, { saveMapSuccess: false });

    case sync_actions.SELECT_LOCATION_BY_ID:
    return Object.assign({}, state, { selectedLocation: action.id });

    case sync_actions.SET_LOCALS_MAP_LOCATIONS:
    return Object.assign({}, state, { localsMapLocations: action.locations });

    case sync_actions.SELECT_USER:
    return Object.assign({}, state, { selectedUser: action.user, selectedLocation: null });

    case sync_actions.SHOW_UPLOAD_MODAL_FUNCTION:
    return Object.assign({}, state, { showUploadModal: action.boolean });

    case post_actions.SIGN_IN_USER_ERROR:
    return Object.assign({}, state, {
      userError: true,
      signInUserError: action.error
    });

    case post_actions.SIGN_IN_USER_SUCCESS:
    return Object.assign({}, state, {
      currentUser: action.user,
      signInUserError: false,
      signInModalOpen: false
    });

    case sync_actions.SIGN_IN_MODAL:
    return Object.assign({}, state, {
      signInModalOpen: !state.signInModalOpen
    });

    case sync_actions.SIGN_UP_MODAL:
    return Object.assign({}, state, {
      signUpModalOpen: !state.signUpModalOpen
    });

    case sync_actions.TUTORIAL_MODAL:
    return Object.assign({}, state, { tutorialModalOpen: !state.tutorialModalOpen });

    case sync_actions.UPDATE_LOCATION_IN_LOCALS_MAP:
      let review = action.review;
      const currentUserLocationsAndReviewsCopy = [...state.currentUserLocationsAndReviews];
      review = reviewHandlers.updateOrCreate(review, currentUserLocationsAndReviewsCopy);
      const newCurrentUserLocationsAndReviews = reviewHandlers.updateReviewInReduxStore(review, currentUserLocationsAndReviewsCopy); 
    return Object.assign({}, state, { currentUserLocationsAndReviews: newCurrentUserLocationsAndReviews });

    case put_actions.UPDATE_USER_DETAILS_ERROR:
    return Object.assign({}, state, { updateUserDetailsError: true });

    case put_actions.UPDATE_USER_DETAILS_SUCCESS:
    return Object.assign({}, state, {
      currentUser: action.user,
      updateUserDetailsError: false
    });

    case sync_actions.UPDATE_PROFILE_PICTURE_MODAL:
    return Object.assign({}, state, { updateProfilePictureModalOpen: !state.updateProfilePictureModalOpen });

    case sync_actions.UPDATE_USER_DETAILS_MODAL:
    return Object.assign({}, state, { updateUserDetailsModalOpen: !state.updateUserDetailsModalOpen });

    default:
    return state;
  }
};

export default state;
