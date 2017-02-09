export const SELECT_BY_ID = 'SELECT_BY_ID';
export const selectById = id => ({
	type: SELECT_BY_ID,
	id
});

export const ADD_SELECTED_TAG = 'ADD_SELECTED_TAG';
export const addSelectedTag = tag => ({
	type: ADD_SELECTED_TAG,
	tag
});

export const TOGGLE_TAG_FILTER = 'TOGGLE_TAG_FILTER';
export const toggleTagFilter = () => ({
	type: TOGGLE_TAG_FILTER
});

export const CLEAR_ALL_SELECTED_TAGS = 'CLEAR_ALL_SELECTED_TAGS';
export const clearAllSelectedTags = () => ({
	type: CLEAR_ALL_SELECTED_TAGS
});

export const SET_TAG_FILTER = 'SET_TAG_FILTER';
export const setTagFilter = () => ({
	type: SET_TAG_FILTER
});

export const SAVE_MERGED_LOCATION_INFO = 'SAVE_MERGED_LOCATION_INFO';
export const saveMergedLocationInfo = info => ({
	type: SAVE_MERGED_LOCATION_INFO,
	info
});
