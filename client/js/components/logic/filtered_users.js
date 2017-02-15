const filteredUsers = (mergedLocations, users) => {
  let locationIds = mergedLocations.map((location) => {
    return location.user_id }).filter((item, idx, ary) => {
      console.log('each item...', item)
      return ary.indexOf(item) == idx });
  let selectedUsers = locationIds.map((id) => {
    return users.filter((user) => {
      return user.id === id;
    });
  }).reduce((a, b) => a.concat(b));
  return selectedUsers;
}

export default filteredUsers;
