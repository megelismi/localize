export const FILTER_BY_TAG = 'FILTER_BY_TAG';
export const filterByTag = tag => ({
  type: FILTER_BY_TAG,
  tag
});

export const CLEAR_ALL_APPLIED_TAGS = 'CLEAR_ALL_APPLIED_TAGS';
export const clearAllAppliedTags = () => ({
  type: CLEAR_ALL_APPLIED_TAGS
});

export const SELECT_USER = 'SELECT_USER';
export const selectUser = user => ({
  type: SELECT_USER,
  user
});

export const SELECT_BY_ID = 'SELECT_BY_ID';
export const selectById = id => ({
  type: SELECT_BY_ID,
  id
});

export const FILTER_TAGS_BY_SELECTED_LOCATIONS = 'FILTER_TAGS_BY_SELECTED_LOCATIONS';
export const filterTagsBySelectedLocations = () => ({
  type: FILTER_TAGS_BY_SELECTED_LOCATIONS
})

export const selectUserAndUpdateTags = user => (dispatch, getState) => {
  dispatch({
    type: SELECT_USER,
    user
  });

  if (getState().selectedUserLocations) {
    dispatch({
      type: FILTER_TAGS_BY_SELECTED_LOCATIONS
    });
  }

}
