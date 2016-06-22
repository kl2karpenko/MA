import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import PinForm from './PinForm.jsx';

import Pin from '../models/Pin';

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			model: Pin.pin,
			isValid: false,
			element: ""
		};

		this._save = this._save.bind(this);
	}

	_reset() {
		Pin.pin.pin = "";

		this.setState({
			model: Pin.pin,
			isValid: false
		});
	}

	_save() {
		return Pin
			.save()
			.then((res) => {
				if(res.pin) {
					hashHistory.push('/dialplans');
				}

				this._reset();
			});
	}

	render() {
		return (
			<div className="l-adaptive-wrapper">
				<div className="l-adaptive">
					<PinForm
						options={{
							form: 'pinCheck',
							text: "Enter the code",
							inputType: "password",
							onSubmit: this._save,
							model: this.state.model
						}}
					/>
				</div>
			</div>
		);
	}
}