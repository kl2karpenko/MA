import React, { Component } from 'react';

import UnableToScanQr from './items/UnableToScanQr.jsx';
import MainConnect from './items/MainConnect.jsx';
import LinkButton from 'components/buttons/LinkButton.jsx';

export default class Enter extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="m-angle main main-code">
					<div className="m-angle-wrapper">
						<h2 className="m-angle__header">Scan QR code</h2>

						<LinkButton
							text="Start"
							className="m-angle__button btn btn-round btn-md"
							activeClassName="active"
						  href="/connects/qr"
							/>
					</div>
				</div>

				<MainConnect
					header={"Where can I find this QR Code?"}
				  text={'Use a computer to log in to your webinterface Click on your name in' +
				   ' the top-right corner Select “Connect App” from the menu'}
					/>

				<UnableToScanQr/>
			</div>
		);
	}
}