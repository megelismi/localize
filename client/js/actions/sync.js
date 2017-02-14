export const FILTER_BY_TAG = 'FILTER_BY_TAG';
export const filterByTag = tag => ({
  type: FILTER_BY_TAG,
  tag
});

export const CLEAR_ALL_APPLIED_TAGS = 'CLEAR_ALL_APPLIED_TAGS';
export const clearAllAppliedTags = boolean => ({
  type: CLEAR_ALL_APPLIED_TAGS,
  user_is_selected: boolean
});

export const SELECT_USER = 'SELECT_USER';
export const selectUser = user => ({
  type: SELECT_USER,
  user
});

export const SELECT_LOCATION_BY_ID = 'SELECT_LOCATION_BY_ID';
export const selectLocationById = id => ({
  type: SELECT_LOCATION_BY_ID,
  id
});

export const FILTER_TAGS_BY_SELECTED_LOCATIONS = 'FILTER_TAGS_BY_SELECTED_LOCATIONS';
export const filterTagsBySelectedLocations = () => ({
  type: FILTER_TAGS_BY_SELECTED_LOCATIONS
});

export const FILTER_TAGS_BY_USER = 'FILTER_TAGS_BY_USER';
export const filterTagsByUser = () => ({
  type: FILTER_TAGS_BY_USER
});

export const selectUserAndUpdateTags = user => (dispatch, getState) => {
  let currentValue = getState().selectedUserLocations
  dispatch({
    type: SELECT_USER,
    user
  });
  if (currentValue !== getState().selectedUserLocations) {
    dispatch({
      type: FILTER_TAGS_BY_SELECTED_LOCATIONS
    });
  }
  if (getState().selectedUser) {
    dispatch({
      type: FILTER_TAGS_BY_USER
    });
  }
}
