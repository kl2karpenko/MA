import React, { Component } from 'react';

export default class Checkbox extends Component {
	constructor(props) {
		super(props.options);

		this.state ={
			checked: false
		};
	}

	onChange() {
		// console.log(this.props.options.onChange);

		if (typeof this.props.options.onChange === "function") {
			this.props.options.onChange();
		}
	}

	render() {
		let text = this.props.options.text;

		return (
			<label className="m-label checkbox-block" htmlFor={this.props.options.id}>
				<input
					type="checkbox"
					name={this.props.options.name}
					value={this.props.options.value}
					checked={this.state.checked ? "checked" : ""}
					id={this.props.options.id}
					onChange={this.onChange.bind(this)}
				/>
				<div className="checkbox-button"></div>
				{typeof text === "function" ? text() : text}
			</label>
		);
	}
}