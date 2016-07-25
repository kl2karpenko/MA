import React, { Component } from 'react';
import config from 'envConfig';
import Tappable from 'react-tappable';

export default class SearchTop extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ""
		};
	}

	render() {
		return (
			<Tappable
				component="input"
				id="searchContacts"
				type="text"
				onChange={() =>{
					console.log('change')
				}}
				onInput={() =>{
					console.log('onInput')
				}}
				defaultValue={this.state.value}
				className="input-custom input-search"
				placeholder="Enter name or phone number"
			/>
		);
	}
}