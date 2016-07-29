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

	// TODO: THINK ABOUT DELETING THIS AND CHANGE INPUT=CHECKBOX STATE WITH ONCHANGE EVENT
	componentWillReceiveProps(props) {
		console.log('componentWillReceiveProps');

		let config = this._config(props.options);

		props.options.info = config.info;
		props.options.checked = config.checked;

		this.setState(props.options);
	}

	_config(data) {
		let
			config = {},
			dataName = data.name,
			activeKey = data.active_action_key,
			activeActionInDialplan = Dialplan._getActiveActionKey(),
			activeTransfer = Dialplan._getActiveTransfer(),
			savedTransfer = Dialplan.getValueByPath("follow.contact"),
			activeMailbox = Dialplan._getActiveMailbox(),
			mobileNumber = PhoneNumber.getValueByPath('value'),
			ifEqualToMobileNumber = Dialplan._checkIfEqualToMobileNumber();

		switch(dataName) {
			case "mailbox":

				config.info = !this.props.personal && (activeMailbox ? activeMailbox.number : "Tap to choose a mailbox");
				config.checked = activeActionInDialplan === activeKey ? "checked" : "";
				break;

			case "contact":
				let transferIsChosen = (activeActionInDialplan === activeKey &&
				(activeTransfer && activeTransfer.number) && !ifEqualToMobileNumber.activeTransfer);
				config.checked = transferIsChosen ? "checked" : "";

				config.info =	transferIsChosen ? (activeTransfer && activeTransfer.number) :
						(savedTransfer || "Tap to choose a contact");
				break;

			case "mobile":
				let mobileIsChosen = ((activeActionInDialplan === activeKey) &&
				(activeTransfer && activeTransfer.number) && ifEqualToMobileNumber.activeTransfer);

				console.log(ifEqualToMobileNumber.activeTransfer);

				config.info = mobileNumber;
				config.checked = mobileIsChosen ? "checked" : "";

				if (mobileIsChosen && ifEqualToMobileNumber.savedTransferNumber) {
					Dialplan.updateAttributesFor("follow.contact", "");
					Dialplan.updateAttributesFor("actions.transfer.items.0.number", "");
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