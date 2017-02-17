import React from 'react';
import NewMap from '../local_components/new_map/new_map';
import LayerMap from '../local_components/new_map/layer_map';
import NewMapSidebar from '../local_components/new_map_sidebar/new_map_sidebar';
import Header from '../partials/header';
import Footer from '../partials/footer';

class NewMapDisplay extends React.Component {

  render() {
    return (
      <div>
      	<Header />
        <LayerMap />
        <NewMapSidebar />
        <Footer />
      </div>
    )
  }
}

export default NewMapDisplay;
