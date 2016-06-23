import React, { Component } from 'react';

import UnableToScanQr from './items/UnableToScanQr.jsx';
import MainConnect from './items/MainConnect.jsx';
import LinkButton from 'components/buttons/LinkButton.jsx';

export default class Qr extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="m-angle main qr-code">
					<div className="m-angle-wrapper">
						<LinkButton
							text="Cancel"
							className="m-angle__button btn btn-round btn-md btn-round-grey"
							href="/connects/main"
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