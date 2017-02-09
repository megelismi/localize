import * as get_actions from './actions/get_result';
import * as sync_actions from './actions/sync';
import { combineReducers } from 'redux';

const locationState = (state = { filter: false, show_all: true }, action) => {
  switch (action.type) {
    case get_actions.GET_LOCATIONS_SUCCESS:
      return state = Object.assign({}, state, {
        locations: action.locations,
        locations_error: false
      });
    case get_actions.GET_LOCATIONS_ERROR:
      return state = Object.assign({}, state, {
        locations_error: true
      });
    case sync_actions.SAVE_MERGED_LOCATION_INFO:
      return state = Object.assign({}, state, {
        merged_location_info: action.info
      });
		case get_actions.GET_DESCRIPTIONS_SUCCESS:
			return state = Object.assign({}, state, {
				descriptions: action.descriptions,
				descriptions_error: false
			});
		case get_actions.GET_DESCRIPTIONS_ERROR:
			return state = Object.assign({}, state, {
				descriptions_error: true
			});
		case get_actions.GET_TAGS_SUCCESS:
			return state = Object.assign({}, state, {
        tags: action.tags,
        tags_error: false
      });
		case get_actions.GET_TAGS_ERROR:
      return state = Object.assign({}, state, {
        tags_error: true
      });
		case get_actions.GET_LOCATION_TAGS_SUCCESS:
			return state = Object.assign({}, state, {
				location_tags: action.location_tags,
				location_tags_error: false
			});
		case get_actions.GET_LOCATION_TAGS_ERROR:
			return state = Object.assign({}, state, {
				location_tags_error: true
			});
		case sync_actions.ADD_SELECTED_TAG:
			let tags = state.selected_tags || [];
			return state = Object.assign({}, state, {
				selected_tags: [ ...tags, action.tag ]
			});
		case sync_actions.TOGGLE_TAG_FILTER:
			return state = Object.assign({}, state, {
				filter: !state.filter
			});
		case sync_actions.SET_TAG_FILTER:
			return state = Object.assign({}, state, {
				filter: false
			});
		case sync_actions.CLEAR_ALL_SELECTED_TAGS:
			return state = Object.assign({}, state, {
				selected_tags: [],
				show_all_tags: true
			});
		case sync_actions.SELECT_BY_ID:
			return state = Object.assign({}, state, {
				selected_location: action.id
			});
    default:
      return state;
  }
}

export default combineReducers({
	locationState
});
