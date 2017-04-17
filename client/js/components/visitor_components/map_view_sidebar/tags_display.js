import React from 'react';

const TagsDisplay = (props) => {
  if (!props.tags) {
    return <div />;
  }

  return (
    <div>
      {props.tags.map((tag) => {
        let tagClass;
        props.selected.indexOf(tag.tag_id) !== -1 ? tagClass = 'tag-button-selected' : tagClass = 'tag-button';
        return (<button
          className={tagClass}
          onClick={() => { props.filterByTag(tag.tag_id); }}
          key={tag.tag_id}
        >{tag.tag}</button>);
      })}
        <button className="accent-button" onClick={props.clearAllAppliedTags}>Clear all</button>
    </div>
  );
};

export default TagsDisplay;
