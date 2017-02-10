import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/sync.js';

class DefaultSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.changeOnClick = this.changeOnClick.bind(this);
    this.renderNext = this.renderNext.bind(this);
  }

  changeOnClick(tag) {
    this.props.addSelectedTag(tag);
  }

  renderNext() {
    if (this.props.selected.length === 0) {
      this.props.defaultDisplay();
    } else {
      this.props.changeTagsOnDisplay();
    }
  }

  render() {
    const { tags, defaultDisplay, changeTagsOnDisplay, buttonText, selected } = this.props;
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
              selected.indexOf(tag) !== -1 ? tagClass = "tag-button-selected" : tagClass = "tag-button";
              return <button className={tagClass}
              onClick={() => {this.changeOnClick(tag)}}
              key={tag.id}>{tag.tag}</button>})}
          </div>
          <button className="filter-button"
            onClick={this.renderNext}>{buttonText}</button>
        </div>
      )
    }
  }
}

const matchStateToProps = (state) => ({
  selected: state.locationState.selectedTags
})

export default connect(matchStateToProps, actionCreators)(DefaultSidebar);
