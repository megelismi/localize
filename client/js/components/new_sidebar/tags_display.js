import React from 'react';
import { connect } from 'react-redux';

const TagsDisplay = () => {
  return (
    <div>
      {tags.map((tag) => {
        let tagClass;
        selected.indexOf(tag) !== -1 ? tagClass = "tag-button-selected" : tagClass = "tag-button";
        return <button className={tagClass}
        onClick={() => {this.changeOnClick(tag)}}
        key={tag.id}>{tag.tag}</button>})}
    </div>
  )
}

const mapStateToProps = (state) => ({
  tags: state.tagState
});

export default connect ()(TagsDisplay);
