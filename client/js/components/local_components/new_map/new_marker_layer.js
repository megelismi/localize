import React from 'react';
import { LayerGroup, Marker, Popup } from 'react-leaflet';

const MarkerLayer = (props) => {

  return (
    <LayerGroup>{
        <Marker position={[43.6615, -70.2553]}>
            <Popup>
              <span className="popup-info">
                {"A spot"}
              </span>
            </Popup>
          </Marker>
        })
      }
    </LayerGroup>
  )
}

export default MarkerLayer;
