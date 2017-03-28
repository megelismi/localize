const createLocationIdsArrayForUser = (userId, array) => { 
  let locationIds = []; 
  for (let i = 0; i<array.length; i++) {
    let user_id = array[i].user_id; 
    let location_id = array[i].location_id; 
    if (user_id === userId && locationIds.indexOf(location_id) === -1) {
      locationIds.push(location_id);
    }
  }
  return locationIds;
};

export default createLocationIdsArrayForUser; 