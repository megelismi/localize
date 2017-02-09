import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addSelectedTag } from '../../actions/sync.js';

class DefaultSidebar extends React.Component {
  constructor() {
    super();
    this.state = { tagSelected: null }
    this.changeOnClick = this.changeOnClick.bind(this);
  }

  changeOnClick(tag) {
    this.props.addSelectedTag(tag);
    this.setState({ tagSelected: 'selected' })
    // console.log(this.refs.button)
    // this.refs.button.style.backgroundColor = '#ccc';
  }

  testClick(event) {
    console.log('worked')
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
            {tags.map((tag) => <button className={this.state.tagSelected} ref="button"
              onClick={() => {this.changeOnClick(tag)}}
              key={tag.id}>{tag.tag}</button>)}
          </div>
          <button className="filter-button"
            onClick={changeTagsOnDisplay}>{buttonText}</button>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return { addSelectedTag: (tag) => { dispatch(addSelectedTag(tag)) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSidebar);
