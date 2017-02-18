import React from 'react'; 
import Header from '../partials/header';
import Footer from '../partials/footer';

export class UserAccountPage extends React.Component {

	constructor (props) {
		super (props)
	}

	render () {
		return (
			<div>
				<Header />
				<h1>User Account Page</h1>
				<Footer />
			</div>
		)
	}
}


export default UserAccountPage; 
