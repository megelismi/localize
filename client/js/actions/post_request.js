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
				const error = new Error(response.statusText)
				error.response = response
				throw error
			}
			return response
		})
		.then(response => response.json())
		.then(user => dispatch(post_result.createNewUserSuccess(user)))
		.catch(error => dispatch(post_result.createNewUserError(error)))
	}
}

export const signInUser = (emailOrUsername, password) => dispatch => {
  return fetch('/signin', {
    method: 'post', 
    headers: {
      'Content-type': "application/json; charset=utf-8"
    }, 
    body: JSON.stringify(emailOrUsername, password)
    }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json();
  }).then(user => {
    dispatch(post_result.signInUserSuccess(user))
  }).catch(err => {
    dispatch(post_result.signInUserError(err))
  });
}

//   "Authorization": `Bearer ${token}`
