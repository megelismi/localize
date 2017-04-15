import Cookies from 'js-cookie';
import { hashHistory } from 'react-router';
import * as post_result from './post_result.js';

export const createNewUser = user => {
  return dispatch => {
    const url = '/signup';
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      if (!response.ok) {
        return response.json()
        .then(error => dispatch(post_result.createNewUserError(error.message)));
      } 
        return response.json()
        .then(user => {
          hashHistory.push('/map/portland');
          dispatch(post_result.createNewUserSuccess(user));
        });
    });
  };
};

export const getLocationsForTags = () => (dispatch, getState) => {
  const selectedUser = getState().selectedUser;
  const tags = getState().selectedTags; 
  let userId = 0; 
  if (selectedUser) {
    userId = selectedUser.id; 
  }
  return fetch('/locations/tags', {
  method: 'post',
  headers: {
    'Content-type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify({ tags, userId })
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  }).then(res => {
    dispatch(post_result.getLocationsForTagsSuccess(res));
  }).catch(err => {
    dispatch(post_result.getLocationsForTagsError(err));
  });
};

export const getRelevantTags = locations => (dispatch, getState) => {
  const selectedUser = getState().selectedUser;
  let userId = 0;  
  if (selectedUser) {
    userId = selectedUser.id; 
  }
  const locationIds = locations.map(location => {
    return location.id; 
  });
    return fetch('/tags', {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ locationIds, userId })
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  }).then(res => {
    dispatch(post_result.getRelevantTagsSuccess(res));
  }).catch(err => {
    dispatch(post_result.getRelevantTagsError(err));
  });
};

export const getSelectedLocationReviews = (locationId) => (dispatch, getState) => {
  const selectedUser = getState().selectedUser;
  let userId = 0; 
  if (selectedUser) {
    userId = selectedUser.id; 
  }
  return fetch('/reviews', {
  method: 'post',
  headers: {
    'Content-type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify({ locationId, userId })
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  }).then(res => {
    dispatch(post_result.getSelectedLocationReviewsSuccess(res));
  }).catch(err => {
    dispatch(post_result.getSelectedLocationReviewsError(err));
  });
};

export const logOut = (token) => dispatch => {
  return fetch('/logout', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  }).then(() => {
    Cookies.remove('localize_token');
    hashHistory.push('/');
    dispatch(post_result.logOutSuccess());
  }).catch(error => { console.log(error); });
};

export const saveMap = (localsMapLocation) => dispatch => {
  return fetch('/map', {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(localsMapLocation)
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  }).then(() => {
    dispatch(post_result.saveMapSuccess());
  }).catch(err => {
    dispatch(post_result.saveMapError(err));
  });
};

export const signInUser = (emailOrUsername, password) => {
	return dispatch => {
		const url = '/signin';
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(emailOrUsername, password)
    })
    .then(response => {
      if (!response.ok) {
        return response.json()
        .then(error => dispatch(post_result.signInUserError(error.message)));
      }
      return response.json()
      .then(user => {
        Cookies.set('localize_token', user.token);
        hashHistory.push('/map/portland');
        dispatch(post_result.signInUserSuccess(user));
      });
    });
	};
};