// refactor into middleware

import { getServer } from './async_middleware';

import * as get_result from './get_result.js';

// function createApiAction(endpoint, name) {
//   return () => dispatch => {
//     return fetch(endpoint)
//     .then(res => {
//       if (!res.ok) {
//         throw new Error(res.statusText)
//       }
//       return res.json();
//     }).then(res => {
//       dispatch(get_result[`${ name }Success`](res))
//     }).catch(err => {
//       dispatch(get_result[`${ name }Error`](res))
//     });
//   }
// }
//
// export const getUsers = createApiAction('/users', 'getUsers')

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

export const getLocations = () => dispatch => {
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
  });
}

export const getTags = () => dispatch => {
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
    dispatch(get_result.getLocationTagsSuccess(res))
  }).catch(err => {
    dispatch(get_result.getLocationTagsError(err))
  });
}

export const getDescriptions = () => dispatch => {
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
  });
}
