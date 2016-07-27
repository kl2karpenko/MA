import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import Tappable from 'react-tappable';

import Dialplan from "models/Dialplan";
import PhoneNumber from "models/PhoneNumber";

export default class Follow extends Component {
	constructor(props) {
		super(props);

		this._goToList = this._goToList.bind(this);

		let config = this._config(props.options);

		props.options.info = config.info;
		props.options.checked = config.checked;

		this.state = props.options;
	}

	componentWillReceiveProps(props) {
		let config = this._config(props.options);

		props.options.info = config.info;
		props.options.checked = config.checked;

		this.setState(props.options);
	}

	_checkIfEqualNumber() {
		let
			mobileNumber = PhoneNumber.getValueByPath('value'),
			numberToTransfer = Dialplan._getActiveTransfer().number;

		numberToTransfer = numberToTransfer.replace(/[\s)(\+]+/gi, "").replace(' ', '');

		return numberToTransfer === mobileNumber;
	}

	_config(data) {
		let
			config = {},
			dataName = data.name,
			activeKey = data.active_action_key,
			activeActionInDialplan = Dialplan._getActiveActionKey(),
			mobileNumber = PhoneNumber.getValueByPath('value');

		switch(dataName) {
			case "mailbox":
				let activeMailbox = Dialplan._getActiveMailbox();

				config.info = !this.props.personal && (activeMailbox && activeMailbox.number || "Tap to choose a mailbox");
				config.checked = activeActionInDialplan === activeKey ? "checked" : "";
				break;

			case "contact":
				config.info = Dialplan.getValueByPath("follow.contact") || "Tap to choose a contact";
				config.checked = (activeActionInDialplan === activeKey
				&& !this._checkIfEqualNumber()) ? "checked" : "";
				break;

			case "mobile":
				config.info = mobileNumber;
				let isActiveMobileFromTransfer = (activeActionInDialplan === activeKey
				&& (Dialplan._getActiveTransfer() && this._checkIfEqualNumber()));

				config.checked = isActiveMobileFromTransfer ? "checked" : "";
				if (isActiveMobileFromTransfer) {
					Dialplan.updateAttributesFor("follow.contact", "");
				}
				break;

			case "origin":
				config.info = "";
				config.checked = activeActionInDialplan === activeKey ? "checked" : "";
				break;
		}

		return config;
	}

	_goToList() {
		hashHistory.push(this.state.link);
	}

	render() {
		return (
			<li className={this.state.className}>
				<Tappable
					pressDelay={500}
					component="label"
					className="m-label radio-block"
					htmlFor={this.state.name}
					onTap={this.props.onChange}>
					<input
						type="radio"
						name="follow"
						value={this.state.name}
						checked={this.state.checked}
						onChange={function() { }}
						id={this.state.name}
					/>
					<div className="radio-button"></div>
					<div className="l-dialplan-text">
						<div className="l-dialplan-name">{this.state.title}</div>
						<div className="l-dialplan-info">{this.state.info}</div>
					</div>
					{this.state.search && <Tappable
						component="button"
						pressDelay={500}
						onTap={this._goToList}
						stopPropagation={true}/>}
				</Tappable>
			</li>
		);
	}
}