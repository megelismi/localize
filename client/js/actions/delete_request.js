import * as delete_result from './delete_result.js';

export const deleteReviewFromDatabase = reviewId => dispatch => {
	return fetch(`/reviews/${reviewId}`, {
		method: 'delete'
	})
	.then(response => {
		if (!response.ok) {
			const error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
		return response;
})
.then(() => dispatch(delete_result.deleteReviewSuccess()))
.catch(error => dispatch(delete_result.deleteReviewError(error)));
};
