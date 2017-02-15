import React from 'react';
import Geosuggest from 'react-geosuggest';

class GooglePlacesPractice extends React.Component {

  onFocus() {
    console.log('onFocus'); // eslint-disable-line
  }

  onBlur(value) {
    console.log('onBlur', value); // eslint-disable-line
  }

  onChange(value) {
    console.log('input changes to :' + value); // eslint-disable-line
  }

  onSuggestSelect(suggest) {
    console.log('suggest', suggest); // eslint-disable-line
  }

  onSuggestNoResults(userInput) {
    console.log('onSuggestNoResults for :' + userInput);
  }

  getData(event) {
    event.preventDefault();
    console.log(this.geoInput);
  }

  render() {
    return (
      <form onSubmit={this.getData.bind(this)}>
        <Geosuggest
          ref={input => this.geoInput = input}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onSuggestSelect={this.onSuggestSelect}
          onSuggestNoResults={this.onSuggestNoResults}
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          radius="20"
        />
      <button type="submit">Submit</button>
      </form>
    )
  }

}

export default GooglePlacesPractice;

// location
// Type: google.maps.LatLng Default: null
//
// To get localized suggestions, define a location to bias the suggests.
