import React from 'react';
import { connect } from 'react-redux';
import { selectById, saveMergedLocationInfo } from '../../actions/sync.js';
import { LayerGroup, Marker, Popup } from 'react-leaflet';

class MarkerLayer extends React.Component {

  componentDidMount() {
    this.props.saveMergedLocationInfo(this.props.locationInfo);
  }

  render() {
    return (
      <LayerGroup>{
          this.props.locationInfo.map((location, index) => {
            return <Marker position={location.lat_long} key={index}>
              <Popup>
                <span className="popup-info">
                  <span className="location-name">{location.name}</span>
                  <br />{location.short_description}<br />
                  <button onClick={() => {this.props.selectById(location.id)}}>See details</button>
                </span>
              </Popup>
            </Marker>
          })
        }
      </LayerGroup>
    )
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
		selectById: (id) => { dispatch(selectById(id)) },
    saveMergedLocationInfo: (info) => { dispatch(saveMergedLocationInfo(info)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerLayer);
