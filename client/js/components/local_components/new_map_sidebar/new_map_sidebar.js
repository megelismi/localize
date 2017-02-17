import React from 'react';
import { connect } from 'react-redux';
import SelectedResults from './selected_results';

const NewMapSidebar = (props) => {

  return (
    <div className="sidebar">
      <SelectedResults results={props.mapzenSelectedResults} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  mapzenSelectedResults: state.mapzenSelectedResults
});

export default connect(mapStateToProps)(NewMapSidebar);
