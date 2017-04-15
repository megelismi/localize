import _ from 'underscore'; 

export const addUserObjectsToReviews = (inputReviews, users) => {
  const userIdxs = {}; 
  users.forEach((user, idx) => {
    userIdxs[user.id] = idx; 
  });
  inputReviews.forEach((review) => {
    const userIdx = userIdxs[review.user_id];  
    review.user = users[userIdx]; 
    delete review.user_id; 
  });
  return inputReviews; 
};

export const deleteReviewFromReduxStore = (inputReview, currentUserLocationsAndReviews) => {
  let reviewIdx; 
  currentUserLocationsAndReviews.forEach((review, idx) => {
    if (review.locationInfo.name === inputReview.locationInfo.name) {
      reviewIdx = idx; 
    }
  }); 
  currentUserLocationsAndReviews.splice(reviewIdx, 1);
  return currentUserLocationsAndReviews; 
};
 
export const updateOrCreate = (inputReview, currentUserLocationsAndReviews) => {
  const reviewToUpdate = currentUserLocationsAndReviews.filter(review => {
    return review.id === inputReview.id;
  });

  if (!reviewToUpdate.length) {
    return inputReview; 
  }
  
  const matchedReview = reviewToUpdate[0]; 
  const inputReviewTags = { tags: inputReview.tags }; 
  const matchedReviewTags = { tags: matchedReview.tags }; 

  if (matchedReview.short_description !== inputReview.short_description) {
    matchedReview.short_description = inputReview.short_description;
    matchedReview.saved = false; 
  }
  if (matchedReview.long_description !== inputReview.long_description) {
    matchedReview.long_description = inputReview.long_description; 
    matchedReview.saved = false; 
  } 
  if (_.isEqual(inputReviewTags, matchedReviewTags)) {
    matchedReview.tags = inputReview.tags; 
    matchedReview.saved = false; 
  }
  return matchedReview;
};

export const updateReviewInReduxStore = (inputReview, currentUserLocationsAndReviews) => {
  let reviewIdx; 
  currentUserLocationsAndReviews.forEach((review, idx) => {
    if (review.locationInfo.name === inputReview.locationInfo.name) {
      reviewIdx = idx; 
    }
  }); 
  currentUserLocationsAndReviews[reviewIdx] = inputReview; 
  return currentUserLocationsAndReviews; 
};

