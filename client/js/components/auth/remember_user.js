import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import * as get_actions from '../../actions/get_request.js';


export default function (Component) {
  class RememberUser extends React.Component {
    componentDidMount() {
      const token = Cookies.get('localize_token');
      
      if (!this.props.currentUser && token) {
        this.props.dispatch(get_actions.findUserFromCookie(token));
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    currentUser: state.currentUser
  });

  return connect(mapStateToProps)(RememberUser);
}
