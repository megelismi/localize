import React from 'react';
import { Map } from 'react-leaflet';
import Tangram from 'tangram';

class LeafletMap extends React.Component {
  componentDidMount () {
    const layer = Tangram.leafletLayer({
       scene: 'https://mapzen.com/carto/bubble-wrap-style/bubble-wrap.yaml',
       attribution: '<a href="https://mapzen.com/tangram">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/">Mapzen</a>'
    });

    layer.addTo(this.map.leafletElement);
  }

  render () {
    return (
      <div className="map-display">
        <Map center={[40.70532, -74.00976]} zoom={15} ref={(ref) => { this.map = ref }} />
      </div>
    );
  }
}

export default LeafletMap;
