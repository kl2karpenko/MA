import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import PinForm from './PinForm.jsx';

import Pin from 'models/Pin';
import Storage from "models/Storage";

import Adaptive from 'components/layouts/adaptive/Index.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

import { Keyboard } from 'components/Keyboard.jsx';

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
		Pin.pin.value = "";

		this.setState({
			model: Pin.pin,
			isValid: false
		});
	}

	_save() {
		let currentPin = Pin.isExist();

		if (currentPin && Pin.getValueByPath('value') === Storage.getValue('pin')) {
			return Pin
				.save()
				.then(() => {
					hashHistory.push('/dialplans');
				})
		} else {
			this._reset();
			Pin.messenger.error('Wrong Pin', "Error");
		}
	}

	render() {
		setTimeout(function () {
			Keyboard.addEventHide();
			Keyboard.closeKeyBoard();
		}, 0);

		return (<AdaptiveWrapper>
			<Adaptive>
				<PinForm
					options={{
						form: 'pinCheck',
						text: "Enter the code",
						inputType: "password",
						onSubmit: this._save,
						model: this.state.model
					}}
				/>
			</Adaptive>
		</AdaptiveWrapper>);
	}
}