import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/get_request.js';
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
      display = <LocalsDisplay /> :
      display = <TagsDisplay />
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
  users: state.userState.users,
  locationTags: state.tagState.locationTags
})

export default connect(mapStateToProps, actionCreators)(NewSidebar);
