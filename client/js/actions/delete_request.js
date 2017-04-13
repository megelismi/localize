import * as delete_result from './delete_result.js';
import * as get_result from './get_result.js';

export const deleteReview = reviewId => dispatch => {
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
