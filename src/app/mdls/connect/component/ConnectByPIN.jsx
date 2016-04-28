import React from 'react';
import { Link } from 'react-router';

export default class ConnectByPIN extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>
					Enter PIN code
				</h1>

				<div>
					<input type="text" name="pin"/>
					<Link to="/contacts/mobile">Mobile contacts</Link>
				</div>

				<Link to="/connect/qr">Connect by QR code</Link>
			</div>
		);
	}
}