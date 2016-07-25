import React, { Component } from 'react';

import InputOnKeyDown from 'components/inputs/InputOnKeyDown.jsx';
import AllContacts from "../../models/AllContacts";

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
					
					AllContacts.search(value, {
						by: ['number', 'name']
					});
				}}
				value={this.state.value}
				name="contacts"
				className="input-custom input-search"
				placeholder="Enter name or phone number"
			/>
		);
	}
}