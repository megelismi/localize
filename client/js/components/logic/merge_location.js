const mergeLocationAndDescription = (locations, descriptions) => {
  console.log('locations', locations)
  console.log('descriptions', descriptions)
  let mergedLocations = descriptions.map(description => {
    let merge = description;
    let matches = locations.filter(location => location.id === merge.location_id);
    matches.forEach(match => {
      return merge = Object.assign({}, match, {
        short_description: merge.short_description,
        long_description: merge.long_description,
        image: merge.image,
        user_id: merge.user_id
      });
    });
    return merge;
  });
  return mergedLocations;
}

export default mergeLocationAndDescription;
