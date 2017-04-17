const createLocationIdsArrayForUser = (userId, array) => { 
  const locationIds = []; 
  for (let i = 0; i < array.length; i++) {
    const user_id = array[i].user_id; 
    const location_id = array[i].location_id; 
    if (user_id === userId && locationIds.indexOf(location_id) === -1) {
      locationIds.push(location_id);
    }
  }
  return locationIds;
};

export default createLocationIdsArrayForUser; 
