import React, { Component } from 'react';

export default class Checkbox extends Component {
	constructor(props) {
		super(props.options);

		this.state ={
			checked: false
		};
	}

	onChange() {



		if (typeof this.props.onChange === "function") {
			this.props.onChange();
		}
	}

	render() {
		return (
			<label className="m-label checkbox-block" htmlFor={this.props.options.id}>

				<input type="checkbox"
				       name={this.props.name}
				       value={this.props.value}
				       checked={this.state.checked ? "checked" : ""}
				       id={this.props.id}
				       onChange={this.onChange}/>

				<div className="checkbox-button"></div>
				{typeof this.props.text === "function" ? this.props.text() : this.props.text}
			</label>
		);
	}
}