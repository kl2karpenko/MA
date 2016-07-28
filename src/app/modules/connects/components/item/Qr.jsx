import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import UnableToScanQr from './items/UnableToScanQr.jsx';
import MainConnect from './items/MainConnect.jsx';

import Adaptive from 'components/layouts/adaptive/Index.jsx';
import Angle from 'components/modules/angle/Index.jsx';

import Tappable from 'react-tappable';

import { camera, dialogs, barcodeScanner } from 'appConfig';

import Token from 'models/Token';
import messenger from "messenger";

export default class Enter extends Component {
	constructor(props) {
		super(props);
	}

	_getCameraAccess() {
		camera.getCameraStatus().then((isAvailable) => {
			switch(isAvailable) {
				// camera is have been requested and access is granted
				case 1:
					Enter._scanQRCode();
					break;
				// camera is have been requested but access was denied
				case 2:
					camera.requestForAccess().then(Enter._scanQRCode);
					break;
				case 3:
					dialogs.confirm("Please check your settings to allow access to camera", (permissionAccess) => {
						(permissionAccess === 1) && camera.switchToSettings();
					}, "Access to camera denied", ["Go to settings", "Cancel"]);
					break;
			}
		});
	}

	static _scanQRCode() {
		barcodeScanner.scan(
			function (result) {
				if (!result.cancelled && result.text) {
					Token.load({
						type: "qr_code",
						value: result.text
					}).done(() => {
						hashHistory.push('/pin');
					}).fail(() => {
						messenger.error("Wrong connect code", "Error");
					});
				}
			},
			function (error) {
				dialogs.alert("Scanning failed: " + error);
			},
			{
				"preferFrontCamera" : false, // iOS and Android
				"showFlipCameraButton" : false, // iOS and Android
				"prompt" : "Place a barcode inside the scan area", // supported on Android only
				"formats" : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
				"orientation" : "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
			}
		);
	}

	render() {
		return (
		<Adaptive>
			<Angle
				class="main main-code"
				header="Scan QR code">
				<Tappable
					component="button"
					classBase={this.props.activeClassName}
					pressDelay={500}
					className="m-angle__button btn btn-round btn-md"
					onTap={this._getCameraAccess}
				>
					Start
				</Tappable>

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