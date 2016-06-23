import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import PinModel from "../../models/Pin";

import UnableToScanQr from './items/UnableToScanQr.jsx';
import PinForm from 'components/inputs/Pin.jsx';
import MainConnect from './items/MainConnect.jsx';

export default class Pin extends Component {
	constructor(props) {
		super(props);

		this.state = PinModel.getModel();

		this.connect = this.connect.bind(this);
	}

	_reset() {
		PinModel.getModel().pin.value = "";
		this.state.pin.value = "";
		this.setState(PinModel.getModel());
	}

	connect() {
		return PinModel.save({
			for: 'pin'
		}).then((res) => {
			this._reset();
			
			if(res.connects.pin.value) {
				hashHistory.push('/pin');
			}

			return PinModel.getModel();
		});
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="m-angle main">
					<div className="m-angle-wrapper">
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
			        onClick={this.connect}
			        data-form
			        disabled={!(this.state.pin.value.length === 5)}
			        form="connectPin">Log In</button>
					</div>
				</div>


				<MainConnect
					header={"Where can I find this PIN Code?"}
					text={'Use a computer to log in to your webinterface Click on your' +
					 ' name in the top-right corner Select “Connect App” from the menu'}
					/>

				<UnableToScanQr/>
			</div>
		);
	}
}