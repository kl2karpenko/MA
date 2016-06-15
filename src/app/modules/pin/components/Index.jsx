import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import schema from 'schema';
import messenger from "messenger";

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
			pinValue: ""
		};

		this.formName = 'pinCheck';

		this.pinOptions = {
			formName: this.formName,
			name: "Enter the pin",
			inputType: "password",
			onSubmit: this._renderDialplanPage.bind(this),
			keyBoardOptions: {
				multiple: false,
				element: this.state.element,
				formName: this.formName,
				value: this.state.pinValue
			}
		};
	}

	_wrongPinCode(res) {
		messenger.error('Error, wrong PIN code', res.status);

		this.setState({
			pinValue: ""
		});

		this.pinOptions.keyBoardOptions.value = "";
	}

	_renderDialplanPage(value) {
		console.log(value);

		return schema.pin
			.create({
				'pin': value
			})
			.then((res) => {
				if(res.pin) {
					hashHistory.push('/dialplans');
				} else {
					this._wrongPinCode(res);
				}
			});
	}

	render() {
		return (
			<div className="l-adaptive-wrapper">
				<div className="l-adaptive">
					<InputPinForm
						options={this.pinOptions}
						getParentContext={() => {
              return this;
            }}
					/>
				</div>
			</div>
		);
	}
}