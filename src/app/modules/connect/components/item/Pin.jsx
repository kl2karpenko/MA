import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import UnableToScanQr from './items/UnableToScanQr.jsx';
import InputPinForm from 'components/InputPinForm.jsx';

export default class Pin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isValid: false,
			pinValue: [],
			element: ""
		};

		this.inputPinOptions = {
			formName: 'connectPin',
			name: "Enter the code",
			inputType: "number"
		};
	}

	loginByButton() {
		hashHistory.push('/pin');
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="m-angle main">
					<div className="m-angle-wrapper">
						<div className="l-pin-connect">
							<InputPinForm
								options={this.inputPinOptions}
								keyBoardOptions={false}
								getParentContext={() => {
			              return this;
		            }}
							/>
						</div>

						<button className="m-angle__button btn-round btn-md" onClick={this.loginByButton} disabled={!this.state.isValid}>Log In</button>
					</div>
				</div>

				<div className="l-main l-main-connect">

					<div className="l-main-center">
						<h2 className="l-main__header">Where can I find this this Code?</h2>
						<p className="l-main__text">Use a computer to log in to your webinterface
							Click on your name in the top-right corner
							Select “Connect App” from the menu</p>
					</div>
				</div>

				<UnableToScanQr/>
			</div>
		);
	}
}