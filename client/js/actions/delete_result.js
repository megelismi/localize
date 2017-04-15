
export const DELETE_REVIEW_ERROR = 'DELETE_REVIEW_ERROR';  
export const deleteReviewError = error => ({
  type: DELETE_REVIEW_ERROR, 
  error
});

export const DELETE_REVIEW_SUCCESS = 'DELETE_REVIEW_SUCCESS';  
export const deleteReviewSuccess = () => ({
  type: DELETE_REVIEW_SUCCESS
});

