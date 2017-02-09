import React from 'react';
import { connect } from 'react-redux';
import { getTags } from '../../actions/get_request.js';
import { addSelectedTag, toggleTagFilter, setTagFilter, clearAllSelectedTags, selectById } from '../../actions/sync.js';
import ModalDisplay from './modal_display';
import DefaultSidebar from './default_sidebar';
import TagCloud from './tag_cloud';

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = { displayTagCloud: false }
    this.displayTags = this.displayTags.bind(this);
    this.changeTagsOnDisplay = this.changeTagsOnDisplay.bind(this);
    this.defaultDisplay = this.defaultDisplay.bind(this);
  }

  displayTags(e) {
    this.props.getTags()
    this.props.clearAllSelectedTags();
    this.setState({ displayTagCloud: true });
  }

  changeTagsOnDisplay(e) {
    this.props.toggleTagFilter();
    this.setState({ displayTagCloud: false });
    if (this.props.filter) {
      this.props.clearAllSelectedTags();
    }
  }

  defaultDisplay(e) {
    this.props.setTagFilter();
    this.setState({ displayTagCloud: false });
    this.props.clearAllSelectedTags();
  }

  render () {
    const selectedUser = null;
    const { locations, mergedLocations, selectedLocation, selectedTags, filter, showAllTags } = this.props;
    if ((selectedLocation) && this.props.locations) {
      const selected = mergedLocations.filter((location) => location.id === selectedLocation );
      return <ModalDisplay title={selected[0].name} info={selected[0].long_description} />
    }
    if (selectedUser) {
      return <ModalDisplay />
    }
    if (filter) {
      return <TagCloud tags={this.props.selectedTags} changeTagsOnDisplay={this.changeTagsOnDisplay} defaultDisplay={this.defaultDisplay} buttonText={'Clear filters'} />
    }
    if (showAllTags && this.state.displayTagCloud) {
      return <TagCloud tags={this.props.allTags} changeTagsOnDisplay={this.changeTagsOnDisplay} defaultDisplay={this.defaultDisplay} buttonText={'Filter'} />
    }
    return <DefaultSidebar displayTags={this.displayTags} />
  }
}

const mapStateToProps = (state) => ({
  locations: state.locationState.locations,
  selectedLocation: state.locationState.selected_location,
  allTags: state.locationState.tags,
  selectedTags: state.locationState.selected_tags,
  filter: state.locationState.filter,
  showAllTags: state.locationState.show_all_tags,
  mergedLocations: state.locationState.merged_location_info
});

const mapDispatchToProps = (dispatch) => {
  return {
    getTags: () => { dispatch(getTags()) },
    clearAllSelectedTags: () => { dispatch(clearAllSelectedTags()) },
    addSelectedTag: (tag) => { dispatch(addSelectedTag(tag)) },
    toggleTagFilter: (tag) => { dispatch(toggleTagFilter(tag)) },
    setTagFilter: (tag) => { dispatch(setTagFilter(tag)) },
    clearAllSelectedTags: (tag) => { dispatch(clearAllSelectedTags(tag)) },
    selectById: (id) => { dispatch(selectById(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
