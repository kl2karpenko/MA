import React, { Component } from 'react';
import { Link } from 'react-router';

import Dialplan from "models/Dialplan";

export default class Follow extends Component {
	constructor(props) {
		super(props);

		let config = this._config(props.options.name);

		props.options.info = config.info;

		this.state = props.options;
	}

	componentWillReceiveProps(props) {
		let config = this._config(props.options.name);

		props.options.info = config.info;

		this.setState(props.options);
	}

	_getClassName() {
		this.setState({
			className: this.props.options.className + (!Dialplan.getValueByPath("follow.mailbox.is_on") ? " hidden" : "")
		});
	}

	_config(dataName) {
		let config = {};

		switch(dataName) {
			case "mailbox":
				config.info = Dialplan.getValueByPath("follow.mailbox.value.name") || (!this.props.personal && "Tap to choose a mailbox");
				break;
			case "contact":
				config.info = Dialplan.getValueByPath("follow.contact.value.name") || "Tap to choose a contact";
				break;
			case "mobile":
				config.info = this.props.options.info || Dialplan.getValueByPath("follow.mobile.value.number");
				break;
			case "original":
				config.info = "";
				break;
		}

		return config;
	}

	render() {
		return (
			<li className={this.state.className}>
				<label className="m-label radio-block" htmlFor={this.state.name}>
					<input
						type="radio"
						name="follow"
						value={this.state.name}
						checked={Dialplan.getValueByPath("follow." + this.state.name + ".selected") ? "checked" : ""}
						id={this.state.name}
						onChange={this.props.onChange}
					/>
					<div className="radio-button"></div>
					<div className="l-dialplan-text">
						<div className="l-dialplan-name">{this.state.title}</div>
						<div className="l-dialplan-info">{this.state.info}</div>
					</div>
					{this.state.className && <Link to={this.state.link}/>}
				</label>
			</li>
		);
	}
}