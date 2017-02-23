import React from 'react';
import { hashHistory } from 'react-router';


const CreateMap = (props) => {
  return (
    <button
      className="accent-button create-map-button"
      onClick={() => {hashHistory.push(`/newmap/${props.id}`)}}>
      {'Create Map'}
    </button>
  )
}

export default CreateMap;
