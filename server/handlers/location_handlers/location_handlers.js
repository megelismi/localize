
export const convertLatLongToArray = latLong => {
  if (Array.isArray(latLong)) {
    return latLong; 
  } 
  return [latLong.lat, latLong.lng]; 
};

export const mergeLocationsAndReviews = (reviews, locations) => {
  const locationIdxs = {}; 
  locations.forEach((location, idx) => {
    locationIdxs[location.id] = idx; 
  });
  reviews.forEach((review) => {
    const locationIdx = locationIdxs[review.location_id];  
    review.locationInfo = locations[locationIdx]; 
    delete review.location_id; 
  });
  return reviews; 
};

export const mergeLocationsAndTags = (locations, tags) => {
  const locationTags = {}; 
  tags.forEach(tag => {
    const id = tag.location_id; 
    locationTags[id] === undefined ? 
    locationTags[id] = [tag.tag] 
    : locationTags[id].push(tag.tag); 
  });
  
  locations.forEach((location) => {
    if (locationTags[location.id] !== undefined) {
      location.tags = locationTags[location.id];
    }
  });
  return locations; 
};

