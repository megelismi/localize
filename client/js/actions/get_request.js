// refactor into middleware

import * as get_result from './get_result.js';

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
