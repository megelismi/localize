import * as get_actions from './actions/get_result';
import * as sync_actions from './actions/sync';
import { combineReducers } from 'redux';

const state = (state = { allLocationsAndDescriptions: [], selectedTags: [] }, action) => {
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

    case get_actions.GET_TAGS_SUCCESS:
    return state = Object.assign({}, state, {
      tagInfoHelper: action.tags,
      tagsError: false
    });

    case get_actions.GET_TAGS_ERROR:
    return state = Object.assign({}, state, {
      tagsError: true
    });

    case get_actions.GET_LOCATION_USER_TAGS_HELPER_SUCCESS:
    return state = Object.assign({}, state, {
      locationUserTagsHelper: action.location_user_tags,
      locationUserTagsHelperError: false
    });
    case get_actions.GET_LOCATION_USER_TAGS_HELPER_ERROR:
    return state = Object.assign({}, state, {
      locationTagsError: true
    });

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
      allLocationsAndDescriptions: mergedLocations,
      getDescriptionsError: false
    });
    case get_actions.GET_DESCRIPTIONS_ERROR:
    return state = Object.assign({}, state, {
      getDescriptionsError: true
    });

    case sync_actions.FILTER_TAGS_BY_SELECTED_LOCATIONS:
      let relevantTags;
      if (state.allLocationsAndDescriptions) {
        let locationsToFilter = state.selectedUserLocations || state.allLocationsAndDescriptions
        let locationIDs = locationsToFilter.map((location) => location.id)
        .filter((item, idx, ary) => ary.indexOf(item) === idx );
        let filteredJoinArrayForTags = locationIDs.map((id) => {
          return state.locationUserTagsHelper.filter((object) => object.location_id === id)
          .map((object) => object.tag_id) })
          .reduce((a, b) => a.concat(b))
          .filter((item, idx, ary) => ary.indexOf(item) === idx );
        relevantTags = filteredJoinArrayForTags.map((id) => {
          return state.tagInfoHelper.filter((tag) => tag.id === id)
        }).reduce((a, b) => a.concat(b));
      } else {
        relevantTags = [];
      }
    return state = Object.assign({}, state, {
      allTags: relevantTags,
      tagsError: false
    });

    // FILTER_BY_TAG takes all city locations or, if a specific user is selected, it takes
    // just that user's locations
    case sync_actions.FILTER_BY_TAG:
      let newTagsArray, selectedLocations;
      // modify an array of all currently selected tags
      if (state.selectedTags.indexOf(action.tag) === -1) {
        !action.tag ?
          newTagsArray = [] :
          newTagsArray = [ ...state.selectedTags, action.tag ]
      } else if (state.selectedTags.indexOf(action.tag) !== -1) {
        let deleteAt = state.selectedTags.findIndex((elem) => elem === action.tag);
        newTagsArray = state.selectedTags.slice(0, deleteAt).concat(state.selectedTags.slice(deleteAt + 1))
      } else {
        newTagsArray = [];
      }
      // find all locations that match any tag in selected tags array
      if (newTagsArray.length === 0) {
        selectedLocations = [];
        // selectedLocations = state.locationsFilteredByUser || state.allLocationsAndDescriptions;
      } else {
        let locations = state.locationsFilteredByUser || state.allLocationsAndDescriptions;
        let filteredJoinArray = newTagsArray.map((id) => {
          return state.locationUserTagsHelper.filter((object) => {
            return object.tag_id === id
          })
          .map((object) => object.location_id) })
          .reduce((a, b) => a.concat(b))
          .filter((item, idx, ary) => ary.indexOf(item) === idx );
        selectedLocations = filteredJoinArray.map((locationID) => {
          return locations.filter((location) => location.id === locationID);
        }).reduce((a, b) => a.concat(b));
      }
    return state = Object.assign({}, state, {
      selectedTags: newTagsArray,
      selectedLocations: selectedLocations
    });

    case sync_actions.DESELECT_USER:
    return state = Object.assign({}, state, {
      selectedUser: null,
      locationsFilteredByUser: null,
      tagsFilteredByUser: null
    });

    case sync_actions.SELECT_USER:
    return state = Object.assign({}, state, {
      selectedUser: action.user
    });

    case sync_actions.FILTER_LOCATIONS_BY_USER:
      let selectedUserLocations;
      if (action.user) {
        let filteredJoinArrayForUser = state.locationUserTagsHelper.filter((object) => {
          return object.user_id === action.user.id
        });
        selectedUserLocations = filteredJoinArrayForUser.map((object) => {
          return state.allLocationsAndDescriptions.filter((location) => {
            return location.id === object.location_id
          });
        }).reduce((a, b) => a.concat(b)).filter((item, idx, ary) => ary.indexOf(item) === idx );
      } else {
        selectedUserLocations = state.allLocationsAndDescriptions;
      }
    return state = Object.assign({}, state, {
      locationsFilteredByUser: selectedUserLocations
    });

    case sync_actions.FILTER_TAGS_BY_USER:
      let filteredLocationUserTags = state.locationUserTagsHelper.filter((object) => {
        return object.user_id === state.selectedUser.id;
      });
      let tagsFilteredByUser = filteredLocationUserTags.map((object) => {
        return state.allTags.filter((tag) => {
          return tag.id === object.tag_id;
        });
      })
      .reduce((a, b) => a.concat(b))
      .filter((item, idx, ary) => ary.indexOf(item) === idx );
    return state = Object.assign({}, state, {
      tagsFilteredByUser
    });

    case sync_actions.CLEAR_ALL_APPLIED_TAGS:
    return state = Object.assign({}, state, {
      selectedTags: [],
      selectedLocations: []
    });

    case sync_actions.SELECT_LOCATION_BY_ID:
    const selected = state.allLocationsAndDescriptions.filter((location) => location.id === action.id);
    return state = Object.assign({}, state, {
      selectedLocation: selected[0]
    });

    default:
    return state;
  }
}

export default state;
