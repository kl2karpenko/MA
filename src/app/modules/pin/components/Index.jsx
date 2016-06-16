import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import InputPinForm from 'components/InputPinForm.jsx';

import Pin from '../models/Pin';

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			model: Pin,
			isValid: false,
			element: "",
			pinValue: ""
		};
	}

	_reset() {
		Pin.pin = "";

		this.setState({
			pinValue: "",
			isValid: false
		});
	}

	_save(value) {
		Pin.pin = value;

		return Pin
						.save()
						.then((res) => {
							if(res.pin) {
								hashHistory.push('/dialplans');
							} else {
								this._reset();
								Pin.messenger.error('Error, wrong PIN code', res.status);
							}
						});
	}

	render() {
		return (
			<div className="l-adaptive-wrapper">
				<div className="l-adaptive">
					<InputPinForm
						options={{
							formName: 'pinCheck',
							name: "Enter the pin",
							inputType: "password",
							onSubmit: this._save.bind(this),
							keyBoardOptions: {
								multiple: false,
								element: this.state.element,
								formName: 'pinCheck',
								value: this.state.pinValue
							}
						}}
						getParentContext={() => {
              return this;
            }}
					/>
				</div>
			</div>
		);
	}
}