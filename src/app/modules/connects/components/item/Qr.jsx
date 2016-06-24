import React, { Component } from 'react';

import UnableToScanQr from './items/UnableToScanQr.jsx';
import MainConnect from './items/MainConnect.jsx';
import LinkButton from 'components/buttons/LinkButton.jsx';

import Adaptive from 'components/layouts/adaptive/Index.jsx';
import Angle from 'components/modules/angle/Index.jsx';

export default class Qr extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<Adaptive>
			<Angle
				class="main qr-code"
				header={false}>
				<LinkButton
					text="Cancel"
					className="m-angle__button btn btn-round btn-md btn-round-grey"
					href="/connects/main"
				/>
			</Angle>

			<MainConnect>
				<h2 className="l-main__header">Where can I find this QR Code?</h2>
				<p className="l-main__text">Use a computer to log in to your webinterface Click on your name in
					the top-right corner Select “Connect App” from the menu</p>
			</MainConnect>

			<UnableToScanQr/>
		</Adaptive>
		);
	}
}