import * as get_actions from './actions/get_result';
import * as sync_actions from './actions/sync';
import { combineReducers } from 'redux';

const locationState = (state = { filter: false, show_all: true }, action) => {
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
    case sync_actions.SELECT_BY_ID:
    const selected = state.locationAndDescription.filter((location) => location.id === action.id);
    return state = Object.assign({}, state, {
      selectedLocation: selected[0]
    });
    default:
    return state;
  }
}

const tagState = (state = {}, action) => {
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
    case sync_actions.ADD_SELECTED_TAG:
    let tags = state.selectedTags || [];
    if (state.selectedTags.indexOf(action.tag) === -1) {
      return state = Object.assign({}, state, {
        selectedTags: [ ...tags, action.tag ]
      });
    } else {
      let deleteAt = state.selectedTags.findIndex((elem) => elem.id === action.tag.id);
      let newArray = state.selectedTags.slice(0, deleteAt).concat(state.selectedTags.slice(deleteAt + 1))
      return state = Object.assign({}, state, {
        selectedTags: newArray
      });
    }
    case get_actions.GET_LOCATION_TAGS_SUCCESS:
    return state = Object.assign({}, state, {
      locationTags: action.location_tags,
      locationTagsError: false
    });
    case get_actions.GET_LOCATION_TAGS_ERROR:
    return state = Object.assign({}, state, {
      locationTagsError: true
    });
    case sync_actions.SET_TAG_FILTER:
    return state = Object.assign({}, state, {
      filter: false
    });
    case sync_actions.CLEAR_ALL_SELECTED_TAGS:
    return state = Object.assign({}, state, {
      selectedTags: []
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
