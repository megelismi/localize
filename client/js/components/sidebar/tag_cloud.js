import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/sync.js';

class DefaultSidebar extends React.Component {
  constructor() {
    super();
    this.state = { selectedTags: [] }
    this.changeOnClick = this.changeOnClick.bind(this);
  }

  changeOnClick(tag) {
    this.props.addSelectedTag(tag);
    this.setState({
      selectedTags: [ ...this.state.selectedTags, tag.id ]
    });
  }

  render() {
    const { tags, defaultDisplay, changeTagsOnDisplay, buttonText } = this.props;
    if (!tags) {
      return <div></div>
    } else {
      return (
        <div className="sidebar">
          <button className="close-button"
            onClick={defaultDisplay}>X</button>
          <div>
            {tags.map((tag) => {
              let tagClass;
              this.props.selected.indexOf(tag) !== -1 ? tagClass = "tag-button-selected" : tagClass = "tag-button";
              return <button className={tagClass}
              onClick={() => {this.changeOnClick(tag)}}
              key={tag.id}>{tag.tag}</button>})}
          </div>
          <button className="filter-button"
            onClick={changeTagsOnDisplay}>{buttonText}</button>
        </div>
      )
    }
  }
}

const matchStateToProps = (state) => ({
  selected: state.locationState.selectedTags
})

export default connect(matchStateToProps, actionCreators)(DefaultSidebar);
