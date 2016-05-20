import React, { Component } from 'react';
import { Link } from 'react-router';

import imageLoader from 'lib/imageLoader';

import UnableToScanQr from './items/UnableToScanQr.jsx';

class ConnectPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="m-angle main">
					<img src={imageLoader(require("images/main-back.jpg"))} alt="Main background"/>
					<h2 className="m-angle__header">Scan QR code</h2>

					<div className="m-angle-border"></div>
				</div>

				<div className="l-main l-main-connect">
					<Link activeClassName="active" className="m-angle__button btn-round btn-md" to="/connect/qr">Start</Link>

					<div className="l-main-center">
						<h2 className="l-main__header">Where can I find this QR Code?</h2>
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

module.exports = ConnectPage;