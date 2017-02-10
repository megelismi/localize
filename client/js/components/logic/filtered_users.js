const filteredUsers = (mergedLocations, users) => {
  let locationIds = mergedLocations.map((location) => location.user_id).filter((item, idx, ary) => ary.indexOf(item) == idx);
  let selectedUsers = locationIds.map((id) => {
    return users.filter((user) => {
      return user.id === id;
    });
  }).reduce((a, b) => a.concat(b));
  return selectedUsers;
}

export default filteredUsers;
