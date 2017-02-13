import React from 'react';

const TagsDisplay = (props) => {
  let tagClass = 'tag-button';

  console.log('tag display props', props);

  return (
    <div>
      {props.tags.map((tag) => {
        let tagClass;
        if (props.selected) {
          props.selected.indexOf(tag) !== -1 ? tagClass = "tag-button-selected" : tagClass = "tag-button";
        }
        return <button className={tagClass}
          onClick={() => {props.filterByTag(tag.id)}}
          key={tag.id}>{tag.tag}</button>})}
    </div>
  )
}

export default TagsDisplay;
