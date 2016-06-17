import React, { Component } from 'react';

export default class Checkbox extends Component {
	constructor(props) {
		super(props);

		this.state ={
			checked: false
		};
	}

	onChange(e) {
	 console.log(e);

		if (typeof this.props.onChange === "function") {
			this.props.onChange();
		}
	}

	render() {
		let text = this.props.text;

		return (
			<label className="m-label checkbox-block" htmlFor={this.props.id}>
				<input
					type="checkbox"
					name={this.props.name}
					value={this.props.value}
					checked={this.state.checked ? "checked" : ""}
					id={this.props.id}
					onChange={this.onChange.bind(this)}
				/>
				<div className="checkbox-button"></div>
				{typeof text === "function" ? text() : text}
			</label>
		);
	}
}