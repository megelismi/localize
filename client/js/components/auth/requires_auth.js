import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { hashHistory } from 'react-router';
import * as get_actions from '../../actions/get_request.js';

export default function (Component) {
  class RequiresAuth extends React.Component {
    componentDidMount() {
      const token = Cookies.get('localize_token');
      
      if (!this.props.currentUser && token) {
        this.props.dispatch(get_actions.findUserFromCookie(token));
      }

      if (!this.props.currentUser && !token) {
        hashHistory.push('/');
      }
    }

    render() {
      if (this.props.currentUser) {
        return <Component {...this.props} />;
      } 
        return <div />;
    }
  }

  const mapStateToProps = state => ({
    currentUser: state.currentUser
  });

  return connect(mapStateToProps)(RequiresAuth);
}
