const mergeLocationAndDescription = (locations, descriptions) => {
  const mergedLocations = descriptions.map(description => {
    let merge = description;
    const matches = locations.filter(location => location.id === merge.location_id);
    matches.forEach(match => {
      merge = Object.assign({}, match, {
        short_description: merge.short_description,
        long_description: merge.long_description,
        image: merge.image
      });
    });
    return merge;
  });
  return mergedLocations;
};

export default mergeLocationAndDescription; 

