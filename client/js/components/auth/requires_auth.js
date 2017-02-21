import React from 'react'; 
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import * as get_actions from '../../actions/get_request.js'; 
import { hashHistory } from 'react-router';


export default function(Component) {
	class RequiresAuth extends React.Component {
		componentDidMount() {
			let token = Cookies.get('localize_token');

			if (!this.props.currentUser && token) {
				this.props.dispatch(get_actions.findUserFromCookie(token))
			}

			if (!this.props.currentUser && !token) {
				hashHistory.push('/');
			}
		}

		render() {
			if (this.props.currentUser) {
				return <Component {...this.props} />
			} else {
				return <div>No user.</div>
			}
		}
	}

	const mapStateToProps = state => ({
		currentUser: state.currentUser
	})

	return connect(mapStateToProps)(RequiresAuth)
}