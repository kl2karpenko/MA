import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import schema from 'schema';
import messenger from "messenger";

import UnableToScanQr from './items/UnableToScanQr.jsx';
import InputPinForm from 'components/InputPinForm.jsx';
import MainConnect from './items/MainConnect.jsx';

export default class Pin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isValid: false,
			pinValue: "",
			element: ""
		};

		this.pinOptions = {
			formName: 'connectPin',
			name: "Enter the code",
			inputType: "number",
			onSubmit: this.connectByPin.bind(this)
		};

		this.keyBoardOptions = {
			value: this.state.pinValue
		}
	}

	connectByPin() {
		schema.login
			.create({
				'pin': this.state.pinValue
			})
			.then((res) => {
				if(res) {
					hashHistory.push('/pin');
				} else {
					messenger.error('Error, bad PIN code', res.status);
				}
			});
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="m-angle main">
					<div className="m-angle-wrapper">
						<div className="l-pin-connect">
							<InputPinForm
								options={this.pinOptions}
								keyBoardOptions={this.keyBoardOptions}
								getParentContext={() => {
			              return this;
		            }}
							/>
						</div>

						<button className="m-angle__button btn btn-round btn-md" onClick={this.connectByPin} data-form disabled={!this.state.isValid} form={this.pinOptions.formName}>Log In</button>
					</div>
				</div>


				<MainConnect
					header={"Where can I find this QR Code?"}
					text={'Use a computer to log in to your webinterface Click on your' +
					 ' name in the top-right corner Select “Connect App” from the menu'}
					/>

				<UnableToScanQr/>
			</div>
		);
	}
}