import React from 'react';

const DisplayTags = (props) => {

  return (
    <div>
      <button onClick={() => {props.displayTags()}}>{"What are you looking for?"}</button>
    </div>
  )
}

export default DisplayTags;
