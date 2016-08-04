import React, { Component }                   from 'react';
import { hashHistory }                        from 'react-router';

import UnableToScanQr                         from './items/UnableToScanQr.jsx';
import MainConnect                            from './items/MainConnect.jsx';

import Adaptive                               from 'components/layouts/adaptive/Index.jsx';
import Angle                                  from 'components/modules/angle/Index.jsx';

import Tappable                               from 'react-tappable';
import Swipeable                              from "react-swipeable";

import { camera, dialogs, barcodeScanner }    from 'appConfig';

import Token                                  from 'models/Token';
import messenger                              from "messenger";

import { $t }                                 from 'lib/locale';

import ReactCSSTransitionGroup  from 'react/lib/ReactCSSTransitionGroup';

/** Import ================================================================== */

export default class Enter extends Component {
	constructor(props) {
		super(props);
	}

	_getCameraAccess() {
		camera.getCameraStatus().then((isAvailable) => {
			if (isAvailable === 1) {
				Enter._scanQRCode();
			}
		}).catch((isAvailable) => {
			console.log('fail to get camera access', isAvailable);

			switch(isAvailable) {
				// camera is have been requested but access was denied
				case 2:
					camera.requestForAccess().then((giveAccess) => {
						if (giveAccess) {
							Enter._scanQRCode();
						}
					});
					break;
				case 3:
					dialogs.confirm($t("camera.check_settings"), (permissionAccess) => {
						(permissionAccess === 1) && camera.switchToSettings();
					}, $t("camera.access_denied"), [$t("to_settings"), $t("cancel")]);
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
						hashHistory.replace('/pin');
					}).fail(() => {
						messenger.error($t("token.wrong_code"), $t("error"));
					});
				}
			},
			function (error) {
				dialogs.alert($t("token.scan_failed") + " " + error);
			},
			{
				"preferFrontCamera" : false, // iOS and Android
				"showFlipCameraButton" : false, // iOS and Android
				"prompt" : $t("token.barcode"), // supported on Android only
				"formats" : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
				"orientation" : "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
			}
		);
	}

	render() {
		return (
			<ReactCSSTransitionGroup
				key="qr-code-page"
				transitionName = "visibility-pages"
				transitionAppear = {true}
				transitionAppearTimeout = {300}
				transitionEnter = {true}
				transitionEnterTimeout = {300}
				transitionLeaveTimeout = {300}
				transitionLeave = {true}
			>
			<Swipeable
				className="swipeable"
				onSwipingLeft={() => {
					hashHistory.replace("/connects/pin");
				}}
			>
			<Adaptive key="qr_code">
				<Angle
					class="main main-code"
					header={$t("connects.qr.scan_qr_code")}>
					<Tappable
						component="button"
						classBase={this.props.activeClassName}
						pressDelay={500}
						className="m-angle__button btn btn-round btn-md"
						onTap={this._getCameraAccess}
					>
						{$t("connects.qr.start")}
					</Tappable>
				</Angle>

				<MainConnect>
					<h2 className="l-main__header">{$t("connects.qr.where_find_code")}</h2>
					<p className="l-main__text">{$t("connects.find_code")}</p>
				</MainConnect>

				<UnableToScanQr/>
			</Adaptive>
		</Swipeable>
		</ReactCSSTransitionGroup>
		);
	}
}