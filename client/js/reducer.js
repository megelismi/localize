import * as get_actions from './actions/get_result';
import * as sync_actions from './actions/sync';
import { combineReducers } from 'redux';

const state = (state = { locationAndDescription: [], selectedTags: [] }, action) => {
  switch (action.type) {

    // CALLED WHEN MAP_DISPLAY LOADS. ASYNC CALL TO DB.
    case get_actions.GET_LOCATIONS_SUCCESS:
    return state = Object.assign({}, state, {
      locations: action.locations,
      locationsError: false
    });
    case get_actions.GET_LOCATIONS_ERROR:
    return state = Object.assign({}, state, {
      locationsError: true
    });

    // CALLED WHEN MAP_DISPLAY LOADS. ASYNC CALL TO DB.
    // called after locations, then locations & descriptions are merged — move this logic to back end
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

    // CALLED WHEN USER CLICKS ON A LOCAL.
    // sets a selected user & identifies the pins they have mapped
    // in map, if there is a selectedUserLocations, that is displayed instead of all locations
    // Clicking 'the locals' link in sidebar header clears selectedUser & selectedUserLocations by passing in null instead of a user ID
    case sync_actions.SELECT_USER:
      let selectedUserLocations;
      if (action.user) {
        let filteredJoinArrayForUser = state.locationUserTags.filter((object) => {
          return object.user_id === action.user.id
        });
        selectedUserLocations = filteredJoinArrayForUser.map((object) => {
          return state.filteredLocations.filter((location) => {
            return location.id === object.location_id
          });
        }).reduce((a, b) => a.concat(b)).filter((item, idx, ary) => ary.indexOf(item) === idx );
      } else {
        selectedUserLocations = null;
      }
    return state = Object.assign({}, state, {
      selectedUserLocations,
      selectedUser: action.user
    });

    // SYNC ACTION CALLED AT THE END OF A DB CALL FOR LOCATIONS & DESCRIPTIONS
    // if there are no selected tags, filtered locations displays all locations
    // in tag cloud display, when a tag is clicked it is added to selected tags array or removed, depending on whether it was already in that array
      // (this allows a user to select and deselect a tag)
    // next, the selected tags array is looped through, and any objects from the location/user/tags array that match that tag ID are selected
    // finally, FILTERED/location/user/tags array is used to filter the full list of locations. any locations that have a user
      // id present in the FILTERED/location/user/tags array are kept as part of the filteredLocations state object
    case sync_actions.FILTER_BY_TAG:
      let newTagsArray, filteredLocations;
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
        filteredLocations = state.locationAndDescription;
      } else {
        let filteredJoinArray = newTagsArray.map((id) => {
          return state.locationUserTags.filter((object) => {
            return object.tag_id === id
          })
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

    // APPLIED WHEN USER CLICKS THE CLEAR TAGS BUTTON
    case sync_actions.CLEAR_ALL_APPLIED_TAGS:
    return state = Object.assign({}, state, {
      selectedTags: [],
      filteredLocations: state.locationAndDescription
    });

    // CALLED IN CHAIN AFTER LOCATIONS & DESCRIPTIONS -- ASYNC CALL TO DB
    case get_actions.GET_TAGS_SUCCESS:
    return state = Object.assign({}, state, {
      tagInfo: action.tags,
      tagsError: false
    });

    case get_actions.GET_TAGS_ERROR:
    return state = Object.assign({}, state, {
      tagsError: true
    });

    // CALLED AT END OF LONG ASYNC CHAIN WHEN PAGE FIRST LOADS
    // CALLED WITH THUNK ALONG WITH SELECT_USER WHEN A USER IS SELECTED
    // only display tags that are relevant to whatever locations are currently displayed on map
    case sync_actions.FILTER_TAGS_BY_SELECTED_LOCATIONS:
      let filteredTags;
      if (state.locationAndDescription) {
        let locationsToFilter = state.selectedUserLocations || state.locationAndDescription
        let locationIDs = locationsToFilter.map((location) => location.id)
        .filter((item, idx, ary) => ary.indexOf(item) === idx );

        let filteredJoinArrayForTags = locationIDs
          .map((id) => {
            return state.locationUserTags
              .filter((object) => object.location_id === id)
              .map((object) => object.tag_id)
          })
          .reduce((a, b) => a.concat(b))
          .filter((item, idx, ary) => ary.indexOf(item) === idx );
        filteredTags = filteredJoinArrayForTags.map((id) => {
          return state.tagInfo.filter((tag) => tag.id === id)
        }).reduce((a, b) => a.concat(b));
      } else {
        filteredTags = [];
      }
    return state = Object.assign({}, state, {
      filteredTags,
      tagsError: false
    });

    // DB CALL -- A JOIN TABLE USED TO FIGURE OUT ASSOCIATIONS BTWN LOCATIONS, USERS, AND TAGS
    case get_actions.GET_LOCATION_USER_TAGS_SUCCESS:
    return state = Object.assign({}, state, {
      locationUserTags: action.location_user_tags,
      locationUserTagsError: false
    });
    case get_actions.GET_LOCATION_USER_TAGS_ERROR:
    return state = Object.assign({}, state, {
      locationTagsError: true
    });

    // DB CALL -- GET ALL USERS
    case get_actions.GET_USERS_SUCCESS:
    return state = Object.assign({}, state, {
      users: action.users,
      usersError: false
    });
    case get_actions.GET_USERS_ERROR:
    return state = Object.assign({}, state, {
      usersError: true
    });

    // SYNC ACTION THAT FINDS A SPECIFIC LOCATION TO DISPLAY IN SIDEBAR
    // cleared by passing in 'null' when user X's out of detailed description view
    case sync_actions.SELECT_BY_ID:
    const selected = state.locationAndDescription.filter((location) => location.id === action.id);
    return state = Object.assign({}, state, {
      selectedLocation: selected[0]
    });

    default:
    return state;
  }
}

export default state;
