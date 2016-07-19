import React from 'react';
import LinkButton from 'components/buttons/LinkButton.jsx';

class UnableToScanQr extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="m-connect">
				<div className="m-connect-slider">
					<LinkButton
						text=""
						component="a"
						className="m-connect-slider__button"
						href="/connects/qr"
						/>

					<LinkButton
						text=""
						component="a"
						className="m-connect-slider__button"
						href="/connects/pin"
						/>
				</div>
				<div className="m-connect__link">
					<LinkButton
						component="a"
						text="I’m unable to scan the QR code"
						className=""
						href="/connects/pin"
						/>
				</div>
			</div>
		);
	}
}

module.exports = UnableToScanQr;