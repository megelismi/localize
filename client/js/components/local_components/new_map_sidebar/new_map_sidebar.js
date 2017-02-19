import React from 'react';
import { connect } from 'react-redux';
import SelectedResults from './selected_results';

const NewMapSidebar = (props) => {

  return (
    <div className="sidebar">
      <SelectedResults results={props.localsMapLocations} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  localsMapLocations: state.localsMapLocations
});

export default connect(mapStateToProps)(NewMapSidebar);
