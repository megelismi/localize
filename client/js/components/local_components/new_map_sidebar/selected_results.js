import React from 'react';

const SelectedResults = (props) => {

  return (
    <div>
      <h4>Selected locations</h4>
      <div>
        {props.results.map((location, idx) => {
          return (
            <ul key={idx}>
              <li>{location.feature.properties.name}</li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}

export default SelectedResults;
