import React, { Component } from 'react';
import config from 'envConfig';

import InputOnKeyDown from 'components/inputs/InputOnKeyDown.jsx';

export default class SearchTop extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ""
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(inputValue) {
		if (inputValue.target) {
			inputValue = inputValue.target.value;
		}
		console.log('onChange search ' ,inputValue);

		this.setState({
			value: inputValue
		});

		if (typeof this.props.onChange === "function") {
			this.props.onChange(inputValue);
		}
	}

	render() {
		let InputRender = <InputOnKeyDown
			type="text"
			onChange={this.onChange}
			value={this.state.value}
			name="contacts"
			className="input-custom input-search"
			placeholder="Enter name or phone number"
		/>;

		if (!config.process.isIOS()) {
			InputRender = <input
				autoFocus="true"
				type="text"
				onChange={this.onChange}
				value={this.state.value}
				name="contacts"
				className="input-custom input-search"
				placeholder="Enter name or phone number"
			/>;
		}

		return InputRender;
	}
}