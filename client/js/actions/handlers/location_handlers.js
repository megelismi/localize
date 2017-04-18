
const filterLocations = (locationIds, allLocations) => {
  return allLocations.filter(location => {
    return locationIds.indexOf(location.id) !== -1; 
  });
};

export default filterLocations;
