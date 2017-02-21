// refactor into middleware

import { getServer } from './async_middleware';

import * as get_result from './get_result.js';
import * as sync from './sync.js';

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
