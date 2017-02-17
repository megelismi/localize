import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../../actions/sync.js';

class SelectedResults extends Component {

  addLocationToMap(location) {
    this.props.addLocationToLocalsMap(
      location.feature,
      location.lat_long,
      this.shortDescription.value,
      this.longDescription.value
    );
    this.shortDescription.value = '';
    this.longDescription.value = '';
  }

  render() {
    return (
      <div>
        <h4>Selected locations</h4>
        <div>
          {this.props.results.map((location, idx) => {
            return (
              <div key={idx}>
                <form>
                  <fieldset>
                    <legend>{location.feature.properties.name}</legend>
                    <ul className="hidden edit-location-form">
                      <li>
                        {'A short description — how would you describe this place in a few words?'}<br/>
                      <input type="text" ref={elem => this.shortDescription = elem} />
                      </li>
                      <li>
                        {'A longer description — what do you love about this place? What makes it unique? When do you go, and why?'}<br/>
                      <textarea ref={elem => this.longDescription = elem} />
                      </li>
                    </ul>
                  </fieldset>
                </form>
                <button onClick={() => {this.addLocationToMap(location)}}>Add to map</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(null, syncActionCreators)(SelectedResults);
