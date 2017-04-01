const filterLocations = (locationIds, actionType) => (dispatch, getState) => {
  let allLocations = getState().locations; 
  let filteredLocations = allLocations.filter(location => {
    if (locationIds.indexOf(location.id) !== -1) {
      return location; 
    }
  }); 
  dispatch({
    type: actionType, 
    filteredLocations
  }) 
};

export default filterLocations; 