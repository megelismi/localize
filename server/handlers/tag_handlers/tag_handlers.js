export const addTagValues = (locationUserTags, tags) => {
  const tagIds = tags.map(tag => {
    return tag.id; 
  });
  for (let i = 0; i < locationUserTags.length; i++) {
    const tagId = locationUserTags[i].tag_id;
    const tagIndex = tagIds.indexOf(tagId); 
    const tagValue = tags[tagIndex].tag; 
    locationUserTags[i].tag = tagValue; 
  }
  return locationUserTags; 
};

export const removeDuplicatedTags = array => {
  const uniqueArr = []; 
  const tagIds = {}; 
  
  for (let i = 0; i < array.length; i++) {
    const tagId = array[i].tag_id; 
    if (tagIds[tagId] === undefined) {
      uniqueArr.push(array[i]); 
      tagIds[tagId] = 1; 
    }
  }
  return uniqueArr; 
};
