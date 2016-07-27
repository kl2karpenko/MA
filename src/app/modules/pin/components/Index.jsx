import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import PinForm from './PinForm.jsx';

import LockCode from 'models/LockCode';
import Storage from "models/Storage";

import Adaptive from 'components/layouts/adaptive/Index.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

import { KeyboardComponent } from 'components/Keyboard.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);

		LockCode.lockCode.value = "";

		this.state = {
			model: LockCode.lockCode,
			isValid: false,
			element: ""
		};

		this._save = this._save.bind(this);
	}

	_reset() {
		LockCode.lockCode.value = "";

		this.setState({
			model: LockCode.lockCode,
			isValid: false
		});
	}

	_save() {
		let currentPin = LockCode.isExist();

		if (currentPin && LockCode.getValueByPath('value') === Storage.getValue('lockCode')) {
			return LockCode
				.save()
				.then(() => {
					this._reset();
					hashHistory.push('/dialplans');
				})
		} else {
			this._reset();
			LockCode.messenger.error('Wrong Pin', "Error");
		}
	}

	render() {
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