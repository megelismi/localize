import React from 'react';

const TagsDisplay = (props) => {
  console.log('Tags display', props);
  let tagClass = 'tag-button';

  return (
    <div>
      {props.tags.map((tag) => {
        let tagClass;
        // if (props.selected) {
        //   selected.indexOf(tag) !== -1 ? tagClass = "tag-button-selected" : tagClass = "tag-button";
        // }
        return <button className={tagClass}

          key={tag.id}>{tag.tag}</button>})}
    </div>
  )
}

export default TagsDisplay;

// onClick={() => {this.changeOnClick(tag)}}
