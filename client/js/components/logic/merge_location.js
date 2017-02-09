const mergeLocationAndDescription = (locations, descriptions) => {
  let mergedLocations = descriptions.map(description => {
    let merge = description;
    let matches = locations.filter(location => location.id === merge.location_id);
    matches.forEach(match => {
      return merge = Object.assign({}, match, {
        short_description: merge.short_description,
        long_description: merge.long_description,
        image: merge.image
      });
    });
    return merge;
  });
  return mergedLocations;
}

export default mergeLocationAndDescription;
