// refactor into middleware

import { getServer } from './async_middleware';

import * as get_result from './get_result.js';

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
    });
  });
}

// export const getLocationsAndDescriptions = () => dispatch => {
//   return fetch('/locations')
//   .then(location_res => {
//     if (!location_res.ok) {
//       throw new Error(res.statusText)
//     }
//     return location_res.json();
//   }).then((location_res, location_err) => {
//     return fetch('/reviews')
//     .then(res => {
//       if (!res.ok) {
//         throw new Error(res.statusText)
//       }
//       return res.json();
//     }).then(res => {
//       dispatch(get_result.getLocationsSuccess(res))
//       dispatch(get_result.getDescriptionsSuccess(res))
//     }).catch(err => {
//       dispatch(get_result.getLocationsError(err))
//       dispatch(get_result.getDescriptionsSuccess(err))
//     });
//   });
// }

// export const getLocations = () => dispatch => {
//   return fetch('/locations')
//   .then(res => {
//     if (!res.ok) {
//       throw new Error(res.statusText)
//     }
//     return res.json();
//   }).then(res => {
//     dispatch(get_result.getLocationsSuccess(res))
//   }).catch(err => {
//     dispatch(get_result.getLocationsError(err))
//   });
// }
//
// export const getDescriptions = () => dispatch => {
//   return fetch('/reviews')
//   .then(res => {
//     if (!res.ok) {
//       throw new Error(res.statusText)
//     }
//     return res.json();
//   }).then(res => {
//     dispatch(get_result.getDescriptionsSuccess(res))
//   }).catch(err => {
//     dispatch(get_result.getDescriptionsSuccess(err))
//   });
// }

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
