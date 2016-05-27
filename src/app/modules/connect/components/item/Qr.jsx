import React, { Component } from 'react';
import { Link } from 'react-router';

import imageLoader from 'lib/imageLoader';

import UnableToScanQr from './items/UnableToScanQr.jsx';

export default class Qr extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="m-angle main qr-code">
					<div className="m-angle-wrapper">
						<Link className="m-angle__button btn-round btn-md btn-round-grey" to="/connect/main">Cancel</Link>
					</div>
				</div>

				<div className="l-main l-main-connect">

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