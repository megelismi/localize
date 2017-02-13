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
