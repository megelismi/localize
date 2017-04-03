const mergeReviewsAndUserInfo = (reviews, users) => {
  let userIdxs = {}; 
  
  users.forEach((user, idx) => {
    userIdxs[user.id] = idx; 
  });
  
  reviews.forEach((review, idx) => {
    let userIdx = userIdxs[review.user_id];  
    review.user = users[userIdx]; 
    delete review.user_id; 
  });
  return reviews; 
};

export default mergeReviewsAndUserInfo; 