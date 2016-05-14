import React from 'react';
import { Link } from 'react-router';

import UnableToScanQr from './items/UnableToScanQr.jsx';

export default class ConnectByPIN extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="m-angle main">
				</div>

				<div className="l-main l-main-connect">
					<Link className="m-angle__button" to="/contacts/mobile">Log In</Link>

					<div className="l-main-center">
						<h2 className="l-main__header">Where can I find this this Code?</h2>
						<p className="l-main__text">Use a computer to log in to your webinterface
							Click on your name in the top-right corner
							Select “Connect App” from the menu</p>
					</div>
				</div>

				<UnableToScanQr/>
			</div>
		);
	}
}