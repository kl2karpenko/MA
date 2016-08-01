import React, { Component } from 'react';
import { 
	KeyboardComponent,
	setCurrentFocusedInputTo
} from 'components/Keyboard.jsx';

/** Import ================================================================== */

import Pin from 'components/inputs/Pin.jsx';

export default class PinForm extends Component {
	constructor(props) {
		super(props.options);
		this.keyBoard = this.props.keyBoard;

		this.state = {
			additionalClass: setCurrentFocusedInputTo(5, 0),
			model: this.props.model,
			element: $('input[name=pin]').get(0)
		};

		if (this.keyBoard) {
			this.keyBoard.onSubmit = this.props.onSubmit;
		}

		this.onChange = this.onChange.bind(this);

		KeyboardComponent.keyBoardHide();
	}

	onChange(inputValue) {
		KeyboardComponent.keyBoardHide();

		let pinLength = this.state.model.value.length;
		this.state.model.value = inputValue;

		this.setState({
			additionalClass: setCurrentFocusedInputTo(5, pinLength === 5 ? 0 : inputValue.length - 1),
			model: this.state.model
		});

		if (this.state.model.value.length === 5) {
			this.props.options.onSubmit();
		}

		KeyboardComponent.keyBoardHide();
	}

	render() {
		KeyboardComponent.keyBoardHide();

		console.log("keyboard");
		
		return ( <div className="l-pin">
			<Pin
				model={this.state.model}
				text={this.props.options.text}
				inputType={this.props.options.inputType}
				form={this.props.options.form}
				onSubmit={this.props.options.onSubmit}
				onChange={this.onChange}
			/>

			<KeyboardComponent
				value={this.state.model.value}
				onSubmit={this.props.options.onSubmit}
				onChange={this.onChange}
				isValid={this.state.model.value.length === 5}
				multiple={false}
				form={this.props.options.form}
			  element={this.state.element}
			/>
		</div>
		);
	}
}