import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import PinModel from "../../models/Pin";
import Token from "models/Token";

import UnableToScanQr from './items/UnableToScanQr.jsx';
import PinForm from 'components/inputs/Pin.jsx';
import MainConnect from './items/MainConnect.jsx';

import Adaptive from 'components/layouts/adaptive/Index.jsx';
import Angle from 'components/modules/angle/Index.jsx';

export default class Pin extends Component {
	constructor(props) {
		super(props);

		this.state = PinModel.getModel();

		this.connect = this.connect.bind(this);
	}

	_reset() {
		PinModel.updateAttributesFor('pin.value', '');

		this.setState(PinModel.getModel());
	}

	connect() {
		console.log(PinModel.getValueByPath("value"), 'PinModel.getValueByPath("value")');

		return Token.load({
			type: "connect_code",
			value: PinModel.getValueByPath("value")
		}).done(() => {
			this._reset();

			hashHistory.push('/pin');

			return PinModel.getModel();
		}).fail(() => {
			Token.messenger("Wrong connect code", "Error");
		});
	}

	render() {
		return (
		<Adaptive>
			<Angle
				class="main"
				header={false}>

				<div className="l-pin-connect">
					<div className="l-pin">
						<PinForm
							model={this.state.pin}
							text="Enter the code"
							inputType="number"
							form="connectPin"
							onSubmit={this.connect}
						/>
					</div>
				</div>

				<button
					className="m-angle__button btn btn-round btn-md"
					onTouchStart={this.connect}
					data-form="connectPin"
					disabled={!(this.state.pin.value.length === 5)}
					form="connectPin">Log In</button>
			</Angle>

			<MainConnect>
				<h2 className="l-main__header">Where can I find this PIN Code?</h2>
				<p className="l-main__text">Use a computer to log in to your webinterface Click on your name in
					the top-right corner Select “Connect App” from the menu</p>
			</MainConnect>

			<UnableToScanQr/>
		</Adaptive>
		);
	}
}