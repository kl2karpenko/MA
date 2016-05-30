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
					<Link activeClassName="active" className="m-connect-slider__button" key="1" to="/connect/main"></Link>
					<Link activeClassName="active" className="m-connect-slider__button" key="2" to="/connect/qr"></Link>
					<Link activeClassName="active" className="m-connect-slider__button" key="3" to="/connect/pin"></Link>
				</div>
				<div className="m-connect__link">
					<Link activeClassName="active" to="/connect/pin">I’m unable to scan the QR code</Link>
				</div>
			</div>
		);
	}
}

module.exports = UnableToScanQr;