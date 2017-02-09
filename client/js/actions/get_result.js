export const GET_LOCATIONS_SUCCESS = 'GET_LOCATIONS_SUCCESS';
export const getLocationsSuccess = locations => ({
	type: GET_LOCATIONS_SUCCESS,
	locations
});

export const GET_LOCATIONS_ERROR = 'GET_LOCATIONS_ERROR';
export const getLocationsError = error => ({
	type: GET_LOCATIONS_ERROR,
	error
});

export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const getTagsSuccess = tags => ({
	type: GET_TAGS_SUCCESS,
	tags
});

export const GET_TAGS_ERROR = 'GET_TAGS_ERROR';
export const getTagsError = error => ({
	type: GET_TAGS_ERROR,
	error
});

export const GET_LOCATION_TAGS_SUCCESS = 'GET_LOCATION_TAGS_SUCCESS';
export const getLocationTagsSuccess = location_tags => ({
	type: GET_LOCATION_TAGS_SUCCESS,
	location_tags
});

export const GET_LOCATION_TAGS_ERROR = 'GET_LOCATION_TAGS_ERROR';
export const getLocationTagsError = error => ({
	type: GET_LOCATION_TAGS_ERROR,
	error
});

export const GET_DESCRIPTIONS_SUCCESS = 'GET_DESCRIPTIONS_SUCCESS';
export const getDescriptionsSuccess = descriptions => ({
	type: GET_DESCRIPTIONS_SUCCESS,
	descriptions
});

export const GET_DESCRIPTIONS_ERROR = 'GET_DESCRIPTIONS_ERROR';
export const getDescriptionsError = error => ({
	type: GET_DESCRIPTIONS_ERROR,
	error
});
