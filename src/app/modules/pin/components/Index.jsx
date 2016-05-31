import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import schema from 'schema';

import InputPinForm from 'components/InputPinForm.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.init();
	}

	init() {
		this.state = {
			isValid: false,
			element: "",
			pinValue: []
		};

		this.formName = 'pinCheck';

		this.keyBoardOptions = {
			onSubmit: this._renderDialplanPage.bind(this),
			multiple: false,
			element: this.state.element,
			formName: this.formName,
			value: this.state.pinValue
		};

		this.inputPinOptions = {
			formName: this.formName,
			name: "Enter the pin",
			inputType: "password"
		};
	}

	_getPinCodeValue() {
		return this.state.pinValue.join("");
	}

	_setIfValidPinCodeState() {
		let pinCode = this._getPinCodeValue();

		this.setState({
			isValid: pinCode.length === 5
		});
	}

	_renderDialplanPage() {
		this._checkPinCode()
			.then((res) => {
				if(res) {
					hashHistory.push('/dialplans');
				}
			});
	}

	_checkPinCode() {
		return schema.pin
			.create({
				'pin': this._getPinCodeValue()
			});
	}

	render() {
		return (
			<div className="l-adaptive-wrapper">
				<div className="l-adaptive">
					<InputPinForm
						options={this.inputPinOptions}
						keyBoardOptions={this.keyBoardOptions}
						getParentContext={() => {
              return this;
            }}
					/>
				</div>
			</div>
		);
	}
}