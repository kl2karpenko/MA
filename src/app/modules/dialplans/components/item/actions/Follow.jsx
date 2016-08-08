import React, { Component }   from 'react';
import { hashHistory }        from 'react-router';
import Tappable               from 'react-tappable';

import Dialplan               from "models/Dialplan";
import PhoneNumber            from "models/PhoneNumber";

import { $t }                 from 'lib/locale';
import { logError, logInfo }  from "lib/logger";

/** Import ================================================================== */

export default class Follow extends Component {
	constructor(props) {
		super(props);

		let config = this._config(props.options);

		this.dialplanScope = props.parentScope;

		props.options.info = config.info;
		props.options.checked = config.checked;

		this.state = props.options;

		this._goToList = this._goToList.bind(this);
		this.onChange = this.onChange.bind(this);

		this._listen();
	}

	_listen() {
		$(document).on('forward:phone', () => {
			Dialplan
				._saveFollowToTransfer({
					type: "contact",
					number: PhoneNumber.getValueByPath("value")
				})
				.then(this.props.onChange.bind(this, "mobile"));
		});
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
			activeActionInDialplan = Dialplan._getActiveActionKeyValue(),
			transferedToMobileNumber = Dialplan.isTransferedToPersonalMobileNumber(),
			transferedToExternalNumber = Dialplan.isTransferedToExternalNumber();

		switch(dataName) {
			case "mailbox":
				config.info = !this.props.personal ? (Dialplan.getCachedToMailboxData()
				&& Dialplan.getCachedToMailboxData().number || $t("dialplans.choose_mailbox")) : "";
				config.checked = activeActionInDialplan === activeKey;
				break;

			case "contact":
				config.checked = transferedToExternalNumber;
				config.info = Dialplan.getCachedToExternalNumberData() &&
				Dialplan.getCachedToExternalNumberData().number || $t("dialplans.choose_contact");
				break;

			case "mobile":
				config.checked = transferedToMobileNumber;
				config.info =	PhoneNumber.getValueByPath('value') || "";
				break;

			case "origin":
				config.checked = activeActionInDialplan === activeKey;
				config.info = "";
				break;
		}

		return config;
	}

	_goToList() {
		hashHistory.replace(this.state.link);
	}

	onChange(e, name) {
		name = name || this.state.name;
		
		if (this.refs["radio-" + name].checked) {
			return;
		}
		
		switch(name) {
			case "contact":
				let cachedExternalData = Dialplan.getCachedToExternalNumberData();

				if (cachedExternalData.number) {
					Dialplan
						._saveFollowToTransfer(cachedExternalData)
						.then(this.props.onChange.bind(this, name));
				} else {
					hashHistory.replace('/contacts/mobile');
				}
				break;

			case "mobile":
				PhoneNumber
					._getUserNumber()
					.then((phone) => {
						if (phone) {
							Dialplan
								._saveFollowToTransfer({
									type: "contact",
									number: phone
								})
								.then(this.props.onChange.bind(this, name));
						} else {
							this.dialplanScope.openModalForPhoneNumber();
							logError('Forward to transfer', "cant save, phone number is not defined");
						}
					});
				break;

			case "mailbox":
				let mailbox = Dialplan.getCachedToMailboxData();

				if (mailbox && mailbox.number) {
					Dialplan
						._saveFollowToMailbox(mailbox)
						.then(this.props.onChange.bind(this, name));
				} else {
					if (!this.props.personal) {
						hashHistory.replace('/mailboxes');
					}
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
					moveThreshold={30}
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