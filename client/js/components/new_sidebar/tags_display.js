import React from 'react';
import { connect } from 'react-redux';

const TagsDisplay = (props) => {

  return (
    <div>
      {props.tags.map((tag) => {
        let tagClass;
        props.selected.indexOf(tag.id) !== -1 ? tagClass = "tag-button-selected" : tagClass = "tag-button";
        return <button className={tagClass}
          onClick={() => {props.filterByTag(tag.id)}}
          key={tag.id}>{tag.tag}</button>})}
        <button className="filter-button" onClick={() => {props.clearAllAppliedTags(props.boolean)}}>Clear all</button>
    </div>
  )
}

export default TagsDisplay;
