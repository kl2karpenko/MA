import React from 'react';
import { Link } from 'react-router';

export default class ConnectByQR extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>
					Scan QR code
				</h1>

				<div>
					<input type="text" name="pin"/>
					<Link activeClassName="active" to="/contacts/mobile">Mobile contacts</Link>
					<Link activeClassName="active" to="/contacts/extensions">Users from server</Link>
				</div>
				
				<Link activeClassName="active" to="/connect/pin">Connect by PIN code</Link>
			</div>
		);
	}
}