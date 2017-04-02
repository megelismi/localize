import * as get_actions from './actions/get_result';
import * as post_actions from './actions/post_result';
import * as put_actions from './actions/put_result';
import * as sync_actions from './actions/sync';
import { combineReducers } from 'redux';

const state = (state = {
  allLocationsAndDescriptions: [],
  selectedTags: [],
  mapzenSelectedResults: [],
  localsMapLocations: [],
  signUpModalOpen: false,
  followUpModalOpen: false,
  signInModalOpen: false,
  updateUserDetailsModalOpen: false,
  updateProfilePictureModalOpen: false,
  showModal: false,
  showUploadModal: false,
  tutorialModalOpen: false, 
  locationsSavedModalOpen: false
}, action) => {
  switch (action.type) {

    case get_actions.GET_USERS_WITH_REVIEWS_SUCCESS: 
    return Object.assign({}, state, {relevantUsers: action.users});

    case get_actions.GET_LOCATIONS_FOR_CITY_SUCCESS:
    return Object.assign({}, state, {locations: action.locations, filteredLocations: action.locations}); 

    case post_actions.GET_RELEVANT_TAGS_SUCCESS:
    return Object.assign({}, state, {tags: action.tags});

    case sync_actions.FILTER_LOCATIONS_BY_USER:
    return Object.assign({}, state, {filteredLocations: action.filteredLocations});


    // case sync_actions.FILTER_LOCATIONS_BY_TAGS:
    //   if (state.selectedTags.length > 1) {
    //     return Object.assign({}, state, {filteredLocations: [...state.filteredLocations, ...action.filteredLocations]});
    //   } 
    //   else {
    //     return Object.assign({}, state, {filteredLocations: action.filteredLocations});
    //   }

    case post_actions.GET_LOCATIONS_FOR_TAGS_SUCCESS: 
    return Object.assign({}, state, {filteredLocations: action.filteredLocations});

    case sync_actions.REMOVE_LOCATION_FROM_MAP:
    return Object.assign({}, state, {filteredLocations: action.newFilteredLocations});

    case sync_actions.ADD_SELECTED_TAG:
    return Object.assign({}, state, {selectedTags: [...state.selectedTags, action.tagId]});

    case sync_actions.DESELECT_TAG: 
    return Object.assign({}, state, {selectedTags: action.selectedTags});

    case sync_actions.RESET_LOCATIONS: 
    return Object.assign({}, state, {filteredLocations: state.locations});

    ////////////////

    case post_actions.SAVE_MAP_SUCCESS:
    return state = Object.assign({}, state, { saveMapSuccess: true });

    case post_actions.SAVE_MAP_ERROR:
    return state = Object.assign({}, state, { saveMapSuccess: false });

    case sync_actions.SET_LOCALS_MAP_LOCATIONS:
    return state = Object.assign({}, state, { localsMapLocations: action.locations });

    case sync_actions.UPDATE_LOCATION_IN_LOCALS_MAP:
    let locationToUpdate = state.localsMapLocations.map((elem, idx) => {
      if (elem.name === action.name) {
        return idx;
      }
    }).filter((result) => result !== undefined);
    let newLocations = state.localsMapLocations.slice(0, locationToUpdate[0]).concat(state.localsMapLocations.slice(locationToUpdate[0] + 1));
    return state = Object.assign({}, state, {localsMapLocations: [...newLocations, {
      user_id: action.user_id,
      name: action.name,
      lat_long: action.lat_long,
      short_description: action.short,
      long_description: action.long,
      tag_array: action.tag_array,
      show: 'yes'
    }] }
  );

    case sync_actions.UPDATE_LOCATION_IMAGE:
    let locationWithPhoto = state.localsMapLocations.map((elem, idx) => {
      if (elem.feature.properties.name === action.feature.properties.name) {
        return idx;
      }
    }).filter((result) => result !== undefined);
    let newLocationsWithPhoto = state.localsMapLocations.slice(0, locationWithPhoto[0]).concat(state.localsMapLocations.slice(locationWithPhoto[0] + 1));
    return state = Object.assign({}, state, {localsMapLocations: [...newLocationsWithPhoto, { ...locationToUpdate[0], image: action.image }] }
  );

    case sync_actions.DELETE_LOCATION_FROM_LOCALS_MAP:
    let deleteLocationAt, deleteLocation;
    state.localsMapLocations.map((elem, idx) => {
      if (elem.name === action.location.name) {
        deleteLocation = elem;
        deleteLocationAt = idx;
      }
    }).filter((result) => result !== undefined);

    let newLocalsObject = Object.assign({}, deleteLocation, { show: 'no', saved: false });

    console.log('DELETE LOCATION AT NEW OBJECT', newLocalsObject, 'DELETE LOCATION AT INDEX', deleteLocationAt);

    let newDeleteLocations = state.localsMapLocations.slice(0, deleteLocationAt).concat(state.localsMapLocations.slice(deleteLocationAt + 1));

    return state = Object.assign({}, state, {localsMapLocations: [...newDeleteLocations, newLocalsObject]});

    case sync_actions.ADD_LOCATION_TO_LOCALS_MAP:
    return state = Object.assign({}, state,
      { localsMapLocations: [{
        user_id: action.user_id,
        name: action.feature.properties.name,
        lat_long: action.lat_long,
        short_description: action.short,
        long_description: action.long,
        tag_array: action.tag_array,
        show: 'yes'
      }, ...state.localsMapLocations] }
    );

    case sync_actions.SHOW_MODAL_FUNCTION:
    return state = Object.assign({}, state, { showModal: action.boolean });

    case sync_actions.SHOW_UPLOAD_MODAL_FUNCTION:
    return state = Object.assign({}, state, { showUploadModal: action.boolean });

    case put_actions.UPDATE_USER_DETAILS_SUCCESS:
    Object.assign({}, state, {
      currentUser: action.user,
      updateUserDetailsError: false
    });

    case put_actions.UPDATE_USER_DETAILS_ERROR:
    Object.assign({}, state, {
      updateUserDetailsError: true
    });

    case post_actions.CREATE_NEW_USER_SUCCESS:
    return state = Object.assign({}, state, {
      currentUser: action.user,
      signUpUserError: false,
      signUpModalOpen: false,
      followUpModalOpen: true
    });

    case post_actions.CREATE_NEW_USER_ERROR:
    return state = Object.assign({}, state, {
      userError: true,
      signUpUserError: action.error
    });

    case post_actions.SIGN_IN_USER_SUCCESS:
    return state = Object.assign({}, state, {
      currentUser: action.user,
      signInUserError: false,
      signInModalOpen: false
    });

    case post_actions.SIGN_IN_USER_ERROR:
    return state = Object.assign({}, state, {
      userError: true,
      signInUserError: action.error
    });

    case post_actions.LOG_OUT_SUCCESS:
    return Object.assign({}, state, {
      currentUser: undefined,
      logOutError: false,
      localsMapLocations: [],
      selectedUser: null,
      locationsFilteredByUser: []
    });

    case post_actions.LOG_OUT_ERROR:
    return Object.assign({}, state, {
      logOutError: true
    });

    // case get_actions.GET_USERS_SUCCESS:
    // return state = Object.assign({}, state, {
    //   users: action.users,
    //   usersError: false
    // });

    // // case sync_actions.SHOW_RELEVANT_USERS_ONLY:
    // let selectedUsers;
    // if (state.locationUserTagsHelper && state.users) {
    //   let idsToSelect = state.allLocationsAndDescriptions.map((relation) => {
    //     return relation.user_id
    //   }).filter((item, idx, ary) => ary.indexOf(item) === idx);
    //   selectedUsers = idsToSelect.map((id) => {
    //     return state.users.filter((user) => {
    //       return user.id === id;
    //     });
    //   }).reduce((a, b) => a.concat(b));
    // } else {
    //   selectedUsers = state.users || [];
    // }
    // return state = Object.assign({}, state, {
    //   oldRelevantUsers: selectedUsers
    // });

    // case get_actions.GET_USERS_ERROR:
    // return state = Object.assign({}, state, {
    //   usersError: true
    // });

    // case get_actions.GET_TAGS_SUCCESS:
    // return state = Object.assign({}, state, {
    //   tagInfoHelper: action.tags,
    //   tagsError: false
    // });

    // case get_actions.GET_TAGS_ERROR:
    // return state = Object.assign({}, state, {
    //   tagsError: true
    // });

    // case get_actions.GET_LOCATION_USER_TAGS_HELPER_SUCCESS:
    // return state = Object.assign({}, state, {
    //   locationUserTagsHelper: action.location_user_tags,
    //   locationUserTagsHelperError: false
    // });
    // case get_actions.GET_LOCATION_USER_TAGS_HELPER_ERROR:
    // return state = Object.assign({}, state, {
    //   locationTagsError: true
    // });

    // case get_actions.GET_LOCATIONS_SUCCESS:
    // return state = Object.assign({}, state, {
    //   oldLocations: action.locations,
    //   locationsError: false
    // });
    // case get_actions.GET_LOCATIONS_ERROR:
    // return state = Object.assign({}, state, {
    //   locationsError: true
    // });

    // case get_actions.GET_DESCRIPTIONS_SUCCESS:
    // let mergedLocations = action.descriptions.map(description => {
    //   let merge = description;
    //   let matches = state.filteredLocations.filter(location => location.id === merge.location_id);
    //   matches.forEach(match => {
    //     return merge = Object.assign({}, match, {
    //       short_description: merge.short_description,
    //       long_description: merge.long_description,
    //       image: merge.image,
    //       user_id: merge.user_id,
    //       saved: merge.saved,
    //       show: merge.show || 'yes'
    //     });
    //   });
    //   return merge;
    // });
    // let locationsToInclude = mergedLocations.filter(location => {
    //   return location.show === 'yes';
    // });
    // return state = Object.assign({}, state, {
    //   allLocationsAndDescriptions: locationsToInclude,
    //   getDescriptionsError: false
    // });
    // case get_actions.GET_DESCRIPTIONS_ERROR:
    // return state = Object.assign({}, state, {
    //   getDescriptionsError: true
    // });

    case sync_actions.GET_SEARCH_RESULTS:
    return state = Object.assign({}, state,
      { mapzenSelectedResults: [ ...state.mapzenSelectedResults,
        {feature: action.feature, lat_long: action.lat_long}] }
    );

    case sync_actions.SIGN_UP_MODAL:
    return Object.assign({}, state, {
      signUpModalOpen: !state.signUpModalOpen
    });

    case sync_actions.SIGN_IN_MODAL:
    return Object.assign({}, state, {
      signInModalOpen: !state.signInModalOpen
    });

    case sync_actions.SIGN_UP_FOLLOW_UP_MODAL:
    return Object.assign({}, state, {
      followUpModalOpen: !state.followUpModalOpen
    })

    case sync_actions.UPDATE_USER_DETAILS_MODAL:
      return Object.assign({}, state, {
        updateUserDetailsModalOpen: !state.updateUserDetailsModalOpen
      });

    case sync_actions.UPDATE_PROFILE_PICTURE_MODAL:
      return Object.assign({}, state, {
        updateProfilePictureModalOpen: !state.updateProfilePictureModalOpen
      });

    case sync_actions.TUTORIAL_MODAL:
      return Object.assign({}, state, {
        tutorialModalOpen: !state.tutorialModalOpen
      });

    case sync_actions.LOCATIONS_SAVED_MODAL:
      return Object.assign({}, state, {
        locationsSavedModalOpen: !state.locationsSavedModalOpen
      });

    // case sync_actions.FILTER_TAGS_BY_SELECTED_LOCATIONS:
    // let relevantTags;
    // if (state.allLocationsAndDescriptions) {
    //   let locationsToFilter = state.selectedUserLocations || state.allLocationsAndDescriptions
    //   let locationIDs = locationsToFilter.map((location) => location.id)
    //   .filter((item, idx, ary) => ary.indexOf(item) === idx );
    //   let filteredJoinArrayForTags = locationIDs.map((id) => {
    //     return state.locationUserTagsHelper.filter((object) => object.location_id === id)
    //     .map((object) => object.tag_id) })
    //     .reduce((a, b) => a.concat(b))
    //     .filter((item, idx, ary) => ary.indexOf(item) === idx );
    //     relevantTags = filteredJoinArrayForTags.map((id) => {
    //       return state.tagInfoHelper.filter((tag) => tag.id === id)
    //     }).reduce((a, b) => a.concat(b));
    //   } else {
    //     relevantTags = [];
    //   }
    //   return state = Object.assign({}, state, {
    //     allTags: relevantTags,
    //     tagsError: false
    //   });

    // case sync_actions.FILTER_BY_TAG:

    // FILTER_BY_TAG takes all city locations or, if a specific user is selected, it takes
    // just that user's locations
    // case sync_actions.FILTER_BY_TAG:
    // let newTagsArray, selectedLocations;
    // // modify an array of all currently selected tags
    // if (state.selectedTags.indexOf(action.tag) === -1) {
    //   !action.tag ?
    //   newTagsArray = [] :
    //   newTagsArray = [ ...state.selectedTags, action.tag ]
    // } else if (state.selectedTags.indexOf(action.tag) !== -1) {
    //   let deleteAt = state.selectedTags.findIndex((elem) => elem === action.tag);
    //   newTagsArray = state.selectedTags.slice(0, deleteAt).concat(state.selectedTags.slice(deleteAt + 1))
    // } else {
    //   newTagsArray = [];
    // }
    // // find all locations that match any tag in selected tags array
    // if (newTagsArray.length === 0) {
    //   selectedLocations = [];
    //   // selectedLocations = state.locationsFilteredByUser || state.allLocationsAndDescriptions;
    // } else {
    //   let locations = state.locationsFilteredByUser || state.allLocationsAndDescriptions;
    //   let filteredJoinArray = newTagsArray.map((id) => {
    //     return state.locationUserTagsHelper.filter((object) => {
    //       return object.tag_id === id
    //     })
    //     .map((object) => object.location_id) })
    //     .reduce((a, b) => a.concat(b))
    //     .filter((item, idx, ary) => ary.indexOf(item) === idx );
    //     selectedLocations = filteredJoinArray.map((locationID) => {
    //       return locations.filter((location) => location.id === locationID);
    //     }).reduce((a, b) => a.concat(b));
    //   }
    //   return state = Object.assign({}, state, {
    //     selectedTags: newTagsArray,
    //     selectedLocations: selectedLocations
    //   });

    case sync_actions.DESELECT_USER:
    return state = Object.assign({}, state, {
      selectedUser: null,
      filteredLocations: state.locations,
      tagsFilteredByUser: null
    });

    case sync_actions.SELECT_USER:
    return state = Object.assign({}, state, {
      selectedUser: action.user
    });

    // case sync_actions.FILTER_LOCATIONS_BY_USER:
    // let selectedUserLocations;
    // if (action.user) {
    //   let filteredJoinArrayForUser = state.locationUserTagsHelper.filter((object) => {
    //     return object.user_id === action.user.id
    //   });
    //   selectedUserLocations = filteredJoinArrayForUser.map((object) => {
    //     return state.allLocationsAndDescriptions.filter((location) => {
    //       return location.id === object.location_id
    //     });
    //   }).reduce((a, b) => a.concat(b))
    //   .filter((item, idx, ary) => ary.indexOf(item) === idx )
    //   .filter(item => {
    //     return item.user_id === action.user.id;
    //   });
    // } else {
    //   selectedUserLocations = state.allLocationsAndDescriptions;
    // }
    // return state = Object.assign({}, state, {
    //   locationsFilteredByUser: selectedUserLocations
    // });

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
