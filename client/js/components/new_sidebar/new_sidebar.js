import React from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../actions/sync.js';
import LocalsDisplay from './locals_display';
import TagsDisplay from './tags_display';

class NewSidebar extends React.Component {
  constructor() {
    super();
    this.state = { displayLocals: true }
  }

  showLocalsView() { this.setState({ displayLocals: true }) }
  showTagsView() { this.setState({ displayLocals: false }) }

  render() {
    let display;
    this.state.displayLocals ?
      display = <LocalsDisplay
        users={this.props.users}
        selectUser={this.props.selectUser} /> :
      display = <TagsDisplay
        tags={this.props.filteredTags}
        selected={this.props.selectedTags}
        clearAllAppliedTags={this.props.clearAllAppliedTags}
        filterByTag={this.props.filterByTag} />
    return (
      <div>
        <div>
          <button onClick={this.showLocalsView.bind(this)}>The locals</button>
          <button onClick={this.showTagsView.bind(this)}>{"What are you looking for?"}</button>
        </div>
        <br /><br />
        <div>
          {display}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  selected: state.selectedTags,
  filteredTags: state.filteredTags,
  selectedTags: state.selectedTags,
  locationTags: state.locationTags
});

export default connect(mapStateToProps, syncActionCreators)(NewSidebar);
