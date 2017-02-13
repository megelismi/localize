import * as get_actions from './actions/get_result';
import * as sync_actions from './actions/sync';
import { combineReducers } from 'redux';

const state = (state = { locationAndDescription: [], selectedTags: [] }, action) => {
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

      let locationIDs = mergedLocations.map((location) => location.id)
      .filter((item, idx, ary) => ary.indexOf(item) === idx );

      let filteredJoinArrayForTags = locationIDs.map((id) => {
        return state.locationUserTags.filter((object) => object.location_id === id)
        .map((object) => object.tag_id) })
        .reduce((a, b) => a.concat(b))
        .filter((item, idx, ary) => ary.indexOf(item) === idx );

    return state = Object.assign({}, state, {
      locationAndDescription: mergedLocations,
      filteredJoinArrayForTags,
      getDescriptionsError: false
    });

    case get_actions.GET_DESCRIPTIONS_ERROR:
    return state = Object.assign({}, state, {
      getDescriptionsError: true
    });

    case sync_actions.FILTER_BY_TAG:
      let newTagsArray, filteredLocations;
      if (state.selectedTags.indexOf(action.tag) === -1) {
        !action.tag ?
          newTagsArray = [] :
          newTagsArray = [ ...state.selectedTags, action.tag ]
      } else if (state.selectedTags.indexOf(action.tag) === 0) {
        let deleteAt = state.selectedTags.findIndex((elem) => elem === action.tag);
        newTagsArray = state.selectedTags.slice(0, deleteAt).concat(state.selectedTags.slice(deleteAt + 1))
      } else {
        newTagsArray = [];
      }
      if (state.selectedTags.length === 0 || newTagsArray.length === 0) {
        filteredLocations = state.locationAndDescription;
      } else {
        let filteredJoinArray = newTagsArray.map((id) => {
          return state.locationUserTags.filter((object) => object.tag_id === id)
          .map((object) => object.location_id) })
          .reduce((a, b) => a.concat(b))
          .filter((item, idx, ary) => ary.indexOf(item) === idx );
        filteredLocations = filteredJoinArray.map((locationID) => {
          return state.locationAndDescription.filter((location) => location.id === locationID);
        }).reduce((a, b) => a.concat(b));
      }
    return state = Object.assign({}, state, {
      selectedTags: newTagsArray,
      filteredLocations
    });

    case get_actions.GET_TAGS_SUCCESS:
    let filteredTags;
    if (state.filteredJoinArrayForTags) {
      filteredTags = state.filteredJoinArrayForTags.map((id) => {
        return action.tags.filter((tag) => tag.id === id)
      }).reduce((a, b) => a.concat(b));
    } else {
      filteredTags = [];
    }

    return state = Object.assign({}, state, {
      tagInfo: action.tags,
      filteredTags,
      tagsError: false
    });

    case get_actions.GET_TAGS_ERROR:
    return state = Object.assign({}, state, {
      tagsError: true
    });

    case get_actions.GET_LOCATION_USER_TAGS_SUCCESS:
    return state = Object.assign({}, state, {
      locationUserTags: action.location_user_tags,
      locationUserTagsError: false
    });

    case get_actions.GET_LOCATION_USER_TAGS_ERROR:
    return state = Object.assign({}, state, {
      locationTagsError: true
    });

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

export default state;
