import React from 'react';
import { Link } from 'react-router';

class ConnectPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>
					Connect page
				</h1>

				<Link activeClassName="active" to="/connect/qr">Connect by QR code</Link>

				{this.props.children}
			</div>
		);
	}
}

module.exports = ConnectPage;