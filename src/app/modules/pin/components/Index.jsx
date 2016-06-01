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
			pinValue: []
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

	_renderDialplanPage() {
		schema.pin
			.create({
				'pin': this.state.pinValue
			})
			.then((res) => {
				if(res) {
					hashHistory.push('/dialplans');
				} else {
					messenger.error('Error, bad PIN code', res.status);
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