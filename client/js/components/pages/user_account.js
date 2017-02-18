import React from 'react'; 
import Header from '../partials/header';
import Footer from '../partials/footer';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'; 

export class UserAccountPage extends React.Component {

	constructor (props) {
		super (props)
	}

	routeToHomePage () {
		hashHistory.push('/');
	}

	render () {
		let { currentUser } = this.props; 
		
		if (!currentUser) {
			this.routeToHomePage(); 
		}

		return (
			<div>
				<Header />
				<h1>User Account Page</h1>
				<Footer />
			</div>
		)
	}
}


const mapStateToProps = state => ({
	currentUser: state.currentUser 
})

export default connect(mapStateToProps)(UserAccountPage);
