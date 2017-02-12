const filteredPins = (selectedTags, locationTags, locationAndDescription) => {
  // get the ids of tags to display
  let arrayOfTagIds = selectedTags.map((tag) => tag.id);

  let arrayOfLocationIds = arrayOfTagIds.map((id) => {
    return locationTags.filter((pair) => pair.tag_id === id)
    .map((object) => object.location_id) })
    .reduce((a, b) => a.concat(b))
    .filter((item, idx, ary) => ary.indexOf(item) === idx );

  let filteredLocations = arrayOfLocationIds.map((locationId) => {
    return locationAndDescription.filter((location) => location.id === locationId);
  }).reduce((a, b) => a.concat(b));

  return filteredLocations;
}

export default filteredPins;
