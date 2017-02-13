import * as get_actions from './actions/get_result';
import * as sync_actions from './actions/sync';
import { combineReducers } from 'redux';

const locationState = (state = { locationAndDescription: [] }, action) => {
  switch (action.type) {
    case get_actions.GET_LOCATIONS_SUCCESS:
    return state = Object.assign({}, state, {
      locations: action.locations,
      locationsError: false
    });
    case get_actions.GET_LOCATIONS_ERROR:
    return state = Object.assign({}, state, {
      locationsError: true
    });
    case get_actions.GET_DESCRIPTIONS_SUCCESS:
      let mergedLocations = action.descriptions.map(description => {
        let merge = description;
        let matches = state.locations.filter(location => location.id === merge.location_id);
        matches.forEach(match => {
          return merge = Object.assign({}, match, {
            short_description: merge.short_description,
            long_description: merge.long_description,
            image: merge.image,
            user_id: merge.user_id
          });
        });
        return merge;
      });
    return state = Object.assign({}, state, {
      locationAndDescription: mergedLocations,
      getDescriptionsError: false
    });
    case get_actions.GET_DESCRIPTIONS_ERROR:
    return state = Object.assign({}, state, {
      getDescriptionsError: true
    });
    default:
    return state;
  }
}

const tagState = (state = { selectedTags: [] }, action) => {
  switch (action.type) {
    case get_actions.GET_TAGS_SUCCESS:
    return state = Object.assign({}, state, {
      tagInfo: action.tags,
      tagsError: false
    });
    case get_actions.GET_TAGS_ERROR:
    return state = Object.assign({}, state, {
      tagsError: true
    });
    case get_actions.GET_LOCATION_TAGS_SUCCESS:
    return state = Object.assign({}, state, {
      locationTags: action.location_tags,
      locationTagsError: false
    });
    case get_actions.GET_LOCATION_TAGS_ERROR:
    return state = Object.assign({}, state, {
      locationTagsError: true
    });
    default:
    return state;
  }
}

const userState = (state = {}, action) => {
  switch (action.type) {
    case get_actions.GET_USERS_SUCCESS:
    return state = Object.assign({}, state, {
      users: action.users,
      usersError: false
    });
    case get_actions.GET_USERS_ERROR:
    return state = Object.assign({}, state, {
      usersError: true
    });
    default:
    return state;
  }
}

export default combineReducers({
  locationState,
  tagState,
  userState
});
