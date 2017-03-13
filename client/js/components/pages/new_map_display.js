import React from 'react';
import NewMap from '../local_components/new_map/new_map';
import NewMapSidebar from '../local_components/new_map_sidebar/new_map_sidebar';
import Header from '../partials/header';
import Footer from '../partials/footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getActionCreators from '../../actions/get_request.js';
import * as syncActionCreators from '../../actions/sync.js';
import Tutorial from '../tutorial_modal/tutorial';

class NewMapDisplay extends React.Component {

  render () {
    return (
      <div>
        <Header />
        {this.props.tutorialModalOpen ? <Tutorial /> : null}
        <NewMap />
        <NewMapSidebar />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tutorialModalOpen: state.tutorialModalOpen,
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => {
  return {
    getActionCreators: bindActionCreators(getActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMapDisplay);
