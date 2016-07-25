import React, { Component } from 'react';

export default class SearchTop extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<input
				type="text"
				className="input-custom input-search"
				placeholder="Enter name or phone number"
			/>
		);
	}
}