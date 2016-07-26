import React, { Component } from 'react';

import InputOnKeyDown from 'components/inputs/InputOnKeyDown.jsx';

export default class SearchTop extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ""
		};
	}

	render() {
		return (
			<InputOnKeyDown
				type="text"
				onChange={(value) => {
					this.setState({
						value: value
					});

					if (typeof this.props.onChange === "function") {
						this.props.onChange(value);
					}
				}}
				value={this.state.value}
				name="contacts"
				className="input-custom input-search"
				placeholder="Enter name or phone number"
			/>
		);
	}
}