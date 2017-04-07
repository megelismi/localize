import React from 'react';
import Geosuggest from 'react-geosuggest';

class GooglePlacesPractice extends React.Component {
  constructor() {
    super();
    this.state = { location: '', error: '' };
  }

  onSuggestSelect(suggest) {
    console.log('suggest', suggest);
    this.setState({ location: suggest });
  }

  onSuggestNoResults(userInput) {
    console.log(`onSuggestNoResults for :${userInput}`);
    this.setState({ error: userInput });
  }

  getData(event) {
    event.preventDefault();
    console.log('suggest', this.state.suggest, 'error', this.state.error);
  }

  render() {
    return (
      <form onSubmit={this.getData.bind(this)}>
        <Geosuggest
          autoActivateFirstSuggest
          onSuggestSelect={this.onSuggestSelect.bind(this)}
          onSuggestNoResults={this.onSuggestNoResults.bind(this)}
          location={new google.maps.LatLng(43.6615, -70.2553)}
          radius="20"
        />
      <button type="submit">Submit</button>
      </form>
    );
  }

}

export default GooglePlacesPractice;
