export const FILTER_BY_TAG = 'FILTER_BY_TAG';
export const filterByTag = tag => ({
  type: FILTER_BY_TAG,
  tag
});

export const CLEAR_ALL_APPLIED_TAGS = 'CLEAR_ALL_APPLIED_TAGS';
export const clearAllAppliedTags = () => ({
  type: CLEAR_ALL_APPLIED_TAGS
});
