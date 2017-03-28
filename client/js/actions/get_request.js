// refactor into middleware

import { getServer } from './async_middleware';

import * as get_result from './get_result.js';
import * as post_result from './post_result.js';
import * as sync from './sync.js';

export const getUsersWithReviews = () => dispatch => {
  return fetch('/users/city/1')
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText); 
    }
    return res.json(); 
  }).then(users => {
    dispatch(get_result.getUsersWithReviewsSuccess(users)); 
  }).catch(err => {
    dispatch(get_result.getUsersWithReviewsError(err)); 
  })
};

export const getAllLocationsForCity = () => dispatch => {
  return fetch('/locations/city/1')
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText); 
    }
    return res.json(); 
  }).then(locations => {
    dispatch(get_result.getLocationsForCitySuccess(locations)); 
  }).catch(err => {
    dispatch(get_result.getLocationsForCityError(err)); 
  })
};

export const getSelectedUsers = () => (dispatch, getState) => {
  return fetch('/users')
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json();
  }).then(res => {
    dispatch(get_result.getUsersSuccess(res))
  }).catch(err => {
    dispatch(get_result.getUsersError(err))
  }).then(() => {
    return fetch('/locations/tags')
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json();
    }).then(res => {
      dispatch(get_result.getLocationUserTagsHelperSuccess(res))
    }).catch(err => {
      dispatch(get_result.getLocationUserTagsHelperError(err))
    });
  });
}

export const getUsers = () => dispatch => {
  return fetch('/users')
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json();
  }).then(res => {
    dispatch(get_result.getUsersSuccess(res))
  }).catch(err => {
    dispatch(get_result.getUsersError(err))
  });
}

export const getOneUser = () => dispatch => {
  return fetch('/users/' + id)
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json();
  }).then(res => {
    dispatch(get_result.getOneUserSuccess(res))
  }).catch(err => {
    dispatch(get_result.getOneUserError(err))
  });
}

// move to server
export const getLocationsAndDescriptions = () => dispatch => {
  return fetch('/locations')
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json();
  }).then(res => {
    dispatch(get_result.getLocationsSuccess(res))
  }).catch(err => {
    dispatch(get_result.getLocationsError(err))
  }).then(() => {
    return fetch('/reviews')
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json();
    }).then(res => {
      dispatch(get_result.getDescriptionsSuccess(res))
    }).catch(err => {
      dispatch(get_result.getDescriptionsSuccess(err))
    }).then(() => {
      return fetch('/tags')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json();
      }).then(res => {
        dispatch(get_result.getTagsSuccess(res))
      }).catch(err => {
        dispatch(get_result.getTagsError(err))
      }).then(() => {
        dispatch(sync.filterLocations())
      }).then(() => {
        dispatch(sync.showRelevantUsersOnly());
      });
    });
  });
}

export const getLocationTags = () => dispatch => {
  return fetch('/locations/tags')
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json();
  }).then(res => {
    dispatch(get_result.getLocationUserTagsHelperSuccess(res))
  }).catch(err => {
    dispatch(get_result.getLocationUserTagsHelperError(err))
  });
}

export const findUserFromCookie = token => dispatch => {
  return fetch(`/find/cookie/${token}`)
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json();
  }).then(res => {
    dispatch(post_result.signInUserSuccess(res))
  }).catch(err => {
    dispatch(post_result.signInUserError(err))
  });
}
