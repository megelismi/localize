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

export const removeDuplicatedTags = array => {
  let uniqueArr = []; 
  let tagIds = {}; 
  
  for (let i = 0; i < array.length; i++) {
    let tagId = array[i].tag_id; 
    if (tagIds[tagId] === undefined) {
      uniqueArr.push(array[i]); 
      tagIds[tagId] = 1; 
    }
  }
  return uniqueArr; 
};
