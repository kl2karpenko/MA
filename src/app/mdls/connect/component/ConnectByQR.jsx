import React from 'react';
import { Link } from 'react-router';

import imageLoader from 'imageLoader';

import UnableToScanQr from './items/UnableToScanQr.jsx';

export default class ConnectByQR extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="m-angle main">
					<img src={imageLoader(require("images/qr-back.jpg"))} alt="Qr background"/>
				</div>

				<div className="l-main l-main-connect">
					<Link className="m-angle__button disabled" to="/connect/main">Cancel</Link>

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