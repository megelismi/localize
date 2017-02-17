import * as post_result from './post_result.js';

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
				.then(user => dispatch(post_result.createNewUserSuccess(user)));
			}
		});
	}
}

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
    		.then(user => dispatch(post_result.signInUserSuccess(user)));
    	}
  	});
	}
}

//   "Authorization": `Bearer ${token}`
