import React from 'react';
import { Link } from 'react-router';

class UnableToScanQr extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="m-connect">
				<div className="m-connect-slider">
					<Link activeClassName="active" className="m-connect-slider__button" to="/connect/main"></Link>
					<Link activeClassName="active" className="m-connect-slider__button" to="/connect/qr"></Link>
					<Link activeClassName="active" className="m-connect-slider__button" to="/connect/pin"></Link>
				</div>
				<div className="m-connect__link">
					<Link activeClassName="active" to="/connect/qr">I’m unable to scan the QR code</Link>
				</div>
			</div>
		);
	}
}

module.exports = UnableToScanQr;