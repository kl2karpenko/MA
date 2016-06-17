import React, { Component } from 'react';
import { Keyboard, setCurrentFocusedInputTo } from 'components/Keyboard.jsx';

import Pin from 'components/inputs/Pin.jsx';

export default class PinForm extends Component {
	constructor(props) {
		super(props.options);
		this.keyBoard = this.props.keyBoard;

		this.state = {
			additionalClass: setCurrentFocusedInputTo(3, 0),
			model: this.props.model
		};

		if (this.keyBoard) {
			this.keyBoard.onSubmit = this.props.onSubmit;
		}

		this.onChange = this.onChange.bind(this);
	}

	onChange(inputValue) {
		let pinLength = this.state.model.pin.length;
		this.state.model.pin = inputValue;

		this.setState({
			additionalClass: setCurrentFocusedInputTo(5, pinLength === 5 ? 0 : inputValue.length - 1),
			model: this.state.model
		});

		if (this.state.model.pin.length === 5) {
			this.props.options.onSubmit();
		}
	}

	render() {
		return ( <div className="l-pin">
			<Pin
				model={this.state.model}
				text={this.props.options.text}
				inputType={this.props.options.inputType}
				form={this.props.options.form}
				onSubmit={this.props.options.onSubmit}
				onChange={this.onChange}
			/>

			<Keyboard
				value={this.state.model.pin}
				onSubmit={this.props.options.onSubmit}
				onChange={this.onChange}
				isValid={this.state.model.pin.length === 5}
				multiple={false}
				form={this.props.options.form}
			/>
		</div>
		);
	}
}