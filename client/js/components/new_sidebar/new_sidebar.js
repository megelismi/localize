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
    console.log('new sidebar props', this.props)
    let display;
    this.state.displayLocals ?
      display = <LocalsDisplay /> :
      display = <TagsDisplay
        tags={this.props.tagInfo}
        selected={this.props.selectedTags}
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
  tagInfo: state.tagInfo,
  selectedTags: state.selectedTags,
  locationTags: state.locationTags
});

export default connect(mapStateToProps, syncActionCreators)(NewSidebar);
