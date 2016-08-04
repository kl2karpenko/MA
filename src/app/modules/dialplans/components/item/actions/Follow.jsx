import React, { Component } from 'react';
import { hashHistory }      from 'react-router';
import Tappable             from 'react-tappable';

import Dialplan             from "models/Dialplan";
import PhoneNumber          from "models/PhoneNumber";

import { $t }               from 'lib/locale';

/** Import ================================================================== */

export default class Follow extends Component {
	constructor(props) {
		super(props);

		this._goToList = this._goToList.bind(this);
		this.onChange = this.onChange.bind(this);

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

	_config(data) {
		let
			config = {},
			dataName = data.name,
			activeKey = data.active_action_key,
			activeActionInDialplan = Dialplan._getActiveActionKey(),
			activeTransfer = Dialplan._getActiveTransfer(),
			savedTransfer = Dialplan.getValueByPath("follow.contact.number"),
			activeMailbox = Dialplan._getActiveMailbox(),
			mobileNumber = PhoneNumber.getValueByPath('value'),
			ifEqualToMobileNumber = Dialplan._checkIfEqualToMobileNumber();

		switch(dataName) {
			case "mailbox":

				config.info = !this.props.personal && (activeMailbox ? activeMailbox.number : $t("dialplans.choose_mailbox"));
				config.checked = activeActionInDialplan === activeKey;
				break;

			case "contact":
				let transferIsChosen = (activeActionInDialplan === activeKey &&
				(activeTransfer && activeTransfer.number) && !ifEqualToMobileNumber.activeTransfer);
				config.checked = transferIsChosen;

				config.info =	transferIsChosen ? (activeTransfer && activeTransfer.number) :
						(savedTransfer || $t("dialplans.choose_contact") );
				break;

			case "mobile":
				let mobileIsChosen = ((activeActionInDialplan === activeKey) &&
				(activeTransfer && activeTransfer.number) && ifEqualToMobileNumber.activeTransfer);

				config.info = mobileNumber;
				config.checked = mobileIsChosen;

				if (mobileIsChosen && ifEqualToMobileNumber.savedTransferNumber) {
					Dialplan.updateAttributesFor("follow.contact", Dialplan._getDefaultExtension());
					Dialplan.updateAttributesFor("actions.transfer.items.0.number", "");
				}
				break;

			case "origin":
				config.info = "";
				config.checked = activeActionInDialplan === activeKey;
				break;
		}

		return config;
	}

	_goToList() {
		hashHistory.replace(this.state.link);
	}

	onChange(e) {
		let name = this.state.name;

		switch(name) {
			case "contact":
				let contactNumber = Dialplan.getValueByPath("follow.contact.number");
				let contactId = Dialplan.getValueByPath("follow.contact.id");
				let contactUserId = Dialplan.getValueByPath("follow.contact.user_id");

				if (contactNumber) {
					let dataToSave = {};

					dataToSave.number = contactNumber;
					if (contactId) dataToSave.id = contactId;
					if (contactUserId) dataToSave.user_id = contactId;
					if (contactUserId) {
						dataToSave.type = "extension";
					} else if (!contactUserId && contactId) {
						dataToSave.type = "dialplan";
					} else {
						dataToSave.type = "contact";
					}

					Dialplan
						._saveFollowToTransfer(dataToSave)
						.then(this.props.onChange.bind(this, name));
				} else {
					hashHistory.replace('/contacts/mobile');
				}
				break;

			case "mobile":
				PhoneNumber._getUserNumber().then((phone) => {
					if (phone) {
						Dialplan
							._saveFollowToTransfer({
								type: "contact",
								number: phone
							})
							.then(this.props.onChange.bind(this, name));
					}
				});
				break;

			case "mailbox":
				if (!this.props.personal) {
					let mailbox = Dialplan._getActiveMailbox();

					if (mailbox && mailbox._id) {
						Dialplan
							._saveFollowToMailbox(mailbox)
							.then(this.props.onChange.bind(this, name));
					} else {
						hashHistory.replace('/mailboxes');
					}
				} else {
					Dialplan
						._saveFollowToMailbox()
						.then(this.props.onChange.bind(this, name));
				}
				break;

			default:
				Dialplan
					._saveFollowToOrigin()
					.then(this.props.onChange.bind(this, name));
				break;
		}
	}

	render() {
		return (
			<li className={this.state.className}>
				<Tappable
					pressDelay={500}
					component="label"
					className={"m-label radio-block" + (this.state.search ? " search" : "")}
					htmlFor={this.state.name}
					onTap={this.onChange}
					>
					<input
						ref={"radio-" + this.state.name}
						type="radio"
						name={this.state.name}
						checked={this.state.checked}
						id={this.state.name}
						onChange={() => {}}
					/>
					<div className="radio-button"></div>
					<div className="l-dialplan-text">
						<div className="l-dialplan-name">{$t(this.state.title)}</div>
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