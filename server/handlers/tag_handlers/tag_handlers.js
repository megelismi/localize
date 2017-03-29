export const addTagValues = (locationUserTags, tags) => {
  const tagIds = tags.map(tag => {
    return tag.id; 
  });
  for (let i = 0; i<locationUserTags.length; i++) {
    let tagId = locationUserTags[i].tag_id;
    let tagIndex = tagIds.indexOf(tagId); 
    let tagValue = tags[tagIndex].tag; 
    locationUserTags[i].tag = tagValue; 
  }
  return locationUserTags; 
};

export const deleteDupsAndCombineLocationIds = data => {
  let tagRecords = {};
  let results = []; 
  for (let i = 0; i<data.length; i++) {
    let tag = data[i].tag.toLowerCase();
    data[i].location_id = [data[i].location_id]; 
    if (tagRecords[tag] === undefined) {
      tagRecords[tag] = i; 
    }
    else {
      let newIndex = tagRecords[data[i].tag]; 
      let locationId = data[i].location_id[0]; 
      data[newIndex].location_id.push(locationId);
      data[i].delete = true; 
    }
  }
  for (let i = 0; i<data.length; i++) {
    if (!data[i].delete) {
      results.push(data[i]); 
    }
  }
  return results; 
};