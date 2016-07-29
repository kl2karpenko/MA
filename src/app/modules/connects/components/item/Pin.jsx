import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import ConnectCode from "models/ConnectCode";
import Token from "models/Token";

import UnableToScanQr from './items/UnableToScanQr.jsx';
import PinForm from 'components/inputs/Pin.jsx';
import MainConnect from './items/MainConnect.jsx';

import Adaptive from 'components/layouts/adaptive/Index.jsx';
import Angle from 'components/modules/angle/Index.jsx';

import Swipeable from "react-swipeable";

export default class Pin extends Component {
	constructor(props) {
		super(props);

		this.state = ConnectCode.getModel();

		this.connect = this.connect.bind(this);
	}

	_reset() {
		ConnectCode.updateAttributesFor('value', '');
		this.setState(ConnectCode.getModel());
	}

	connect(value) {
		return Token.load({
			type: "connect_code",
			value: value
		}).then(() => {
			this._reset();

			if (Token.token) {
				hashHistory.push('/pin');
			}

			return ConnectCode.getModel();
		}).fail(() => {
			this._reset();
		});
	}

	render() {
		return (
			<Swipeable
				className="swipeable"
				onSwipingRight={() => {
					hashHistory.push("/connects/qr");
				}}
			>
			<Adaptive key="connect_code">
				<Angle class="main" header={false}>
					<div className="l-pin-connect">
						<div className="l-pin">
							<PinForm
								model={this.state}
								text="Enter the code"
								inputType="number"
								form="connectPin"
								onSubmit={this.connect.bind(this)}
							/>
						</div>
					</div>

					<button
							className="m-angle__button btn btn-round btn-md"
							onTouchStart={this.connect.bind(this)}
							data-form="connectPin"
							disabled={!(this.state.value.length === 5)}
							form="connectPin">
						Log In
					</button>
				</Angle>

				<MainConnect>
					<h2 className="l-main__header">Where can I find this PIN Code?</h2>
					<p className="l-main__text">Use a computer to log in to your webinterface Click on your name in
						the top-right corner Select “Connect App” from the menu</p>
				</MainConnect>

				<UnableToScanQr/>
			</Adaptive>
		</Swipeable>
		);
	}
}