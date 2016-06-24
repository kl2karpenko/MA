import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import PinForm from './PinForm.jsx';

import Pin from '../models/Pin';

import Adaptive from 'components/layouts/adaptive/Index.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

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