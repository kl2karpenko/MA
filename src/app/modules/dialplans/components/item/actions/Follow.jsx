import React, { Component } from 'react';
import { Link } from 'react-router';
import Tappable from 'react-tappable';

import Dialplan from "models/Dialplan";
import Storage from "models/Storage";

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

	_getClassName(props) {
		return props.options.name === "mailbox" && (!Dialplan.getValueByPath("follow.mailbox.is_on") ? " hidden" : "");
	}

	_config(dataName) {
		let
			config = {},
			mobileNumber = Storage.getValue('phone');

		switch(dataName) {
			case "mailbox":
				config.info = Dialplan.getValueByPath("follow.mailbox.value.name") || (!this.props.personal && "Tap to choose a mailbox");
				break;
			case "contact":
				config.info = Dialplan.getValueByPath("follow.contact.value.name") || "Tap to choose a contact";
				break;
			case "mobile":
				config.info = mobileNumber;
				break;
			case "original":
				config.info = "";
				break;
		}

		return config;
	}

	render() {
		return (
			<li className={this.state.className + (this._getClassName(this.props) ? this._getClassName(this.props) : "")}>
				<Tappable
					pressDelay={0}
					component="label"
					className="m-label radio-block"
					htmlFor={this.state.name}
					onTap={this.props.onChange}>
					<input
						type="radio"
						name="follow"
						value={this.state.name}
						checked={Dialplan.getValueByPath("follow." + this.state.name + ".selected") ? "checked" : ""}
						onChange={function() { }}
						id={this.state.name}
					/>
					<div className="radio-button"></div>
					<div className="l-dialplan-text">
						<div className="l-dialplan-name">{this.state.title}</div>
						<div className="l-dialplan-info">{this.state.info}</div>
					</div>
					{this.state.search && <Link to={this.state.link}/>}
				</Tappable>
			</li>
		);
	}
}