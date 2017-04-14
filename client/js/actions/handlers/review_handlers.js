  export const addUserObjectsToReviews = (reviews, users) => {
   const userIdxs = {}; 
    users.forEach((user, idx) => {
      userIdxs[user.id] = idx; 
    });
    reviews.forEach((review) => {
      const userIdx = userIdxs[review.user_id];  
      review.user = users[userIdx]; 
      delete review.user_id; 
    });
    return reviews; 
  };

export const updateReviewInReduxStore = (updatedReview, currentUserLocationsAndReviews) => {
  let reviewIdx; 
  currentUserLocationsAndReviews.forEach((review, idx) => {
    if (review.locationInfo.name === updatedReview.locationInfo.name) {
      reviewIdx = idx; 
    }
  }); 
  currentUserLocationsAndReviews[reviewIdx] = updatedReview; 
  return currentUserLocationsAndReviews; 
};
 
