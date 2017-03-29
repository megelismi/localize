import * as post_result from './post_result.js';
import Cookies from 'js-cookie';
import { hashHistory } from 'react-router';

export const getRelevantTags = locations => (dispatch, getState) => {
  let selectedUser = getState().selectedUser;
  let userId;  
  if (selectedUser) {
    userId = selectedUser.id; 
  }
  let locationIds = locations.map(location => {
    return location.id; 
  });
    return fetch('/locations/tags', {
    method: 'post',
    headers: {
      'Content-type': "application/json; charset=utf-8"
    },
    body: JSON.stringify({locationIds, userId})
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json()
  }).then(res => {
    dispatch(post_result.getRelevantTagsSuccess(res))
  }).catch(err => {
    dispatch(post_result.getRelevantTagsError(err))
  });
};

export const saveMap = (localsMapLocations) => dispatch => {
  console.log(localsMapLocations);
  return fetch('/map', {
    method: 'post',
    headers: {
      'Content-type': "application/json; charset=utf-8"
    },
    body: JSON.stringify(localsMapLocations)
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
  }).then(res => {
    dispatch(post_result.saveMapSuccess())
  }).catch(err => {
    dispatch(post_result.saveMapError())
  });
};

export const createNewUser = user => {
	return dispatch => {
		const url = "/signup"
		return fetch(url, {
			method: 'post',
			headers: {
				'Content-type': "application/json; charset=utf-8"
			},
			body: JSON.stringify(user)
		})
		.then(response => {
			if (!response.ok) {
				return response.json()
				.then(error => dispatch(post_result.createNewUserError(error.message)));
			} else {
				return response.json()
				.then(user => {
          hashHistory.push('/map/portland');
          dispatch(post_result.createNewUserSuccess(user))
        });
			}
		});
	}
}


//Cookies.set('name', 'value');
export const signInUser = (emailOrUsername, password) => {
	return dispatch => {
		const url ="/signin"
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-type': "application/json; charset=utf-8"
    },
    body: JSON.stringify(emailOrUsername, password)
    })
  	.then(response => {
    	if (!response.ok) {
	     	return response.json()
	     	.then(error => dispatch(post_result.signInUserError(error.message)));
    	} else {
    		return response.json()
    		.then(user => {
          Cookies.set('localize_token', user.token)
          hashHistory.push('/map/portland');
          dispatch(post_result.signInUserSuccess(user))
        });
    	}
  	});
	}
}

export const logOut = (token) => dispatch => {
  return fetch ('/logout', {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    if (!res.ok) {
      throw new Error (res.statusText)
    }
  }).then(() => {
    Cookies.remove('localize_token');
    hashHistory.push('/');
    dispatch(post_result.logOutSuccess())
  }).catch(error => {console.log(error)});
}
