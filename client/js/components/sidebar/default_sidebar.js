import React from 'react';

const DefaultSidebar = (props) => {

  return (
    <div className="sidebar">
      <button onClick={() => {props.displayTags()}}>{"What are you looking for?"}</button>
      <div></div>
    </div>
  )
}

export default DefaultSidebar;
