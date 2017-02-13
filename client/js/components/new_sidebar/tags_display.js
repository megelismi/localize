import React from 'react';

const TagsDisplay = (props) => {
  let tagClass = 'tag-button';

  const changeOnClick = (tag) => {
    props.addSelectedTag(tag);
    props.changeMap();
  }

  console.log('tags display', props.selectedTags)

  return (
    <div>
      {props.tags.map((tag) => {
        let tagClass;
        if (props.selected) {
          props.selected.indexOf(tag) !== -1 ? tagClass = "tag-button-selected" : tagClass = "tag-button";
        }
        return <button className={tagClass}
          onClick={() => {changeOnClick(tag)}}
          key={tag.id}>{tag.tag}</button>})}
    </div>
  )
}

export default TagsDisplay;
