import React from 'react'; 
import { connect } from 'react-redux';


export default function(Component) {
	class RequiresAuth extends React.Component {
		// componentDidMount() {
		// 	if (!this.props.user) {
		// 		dispatch(findUserFromCookie)
		// 	}

		// 	if (this.props.userIsInvalid) {
		// 		dispatch(redirectToHome)
		// 	}
		// }

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