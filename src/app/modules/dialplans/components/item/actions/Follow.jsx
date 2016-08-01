import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import Tappable from 'react-tappable';

import Dialplan from "models/Dialplan";
import PhoneNumber from "models/PhoneNumber";

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
			savedTransfer = Dialplan.getValueByPath("follow.contact"),
			activeMailbox = Dialplan._getActiveMailbox(),
			mobileNumber = PhoneNumber.getValueByPath('value'),
			ifEqualToMobileNumber = Dialplan._checkIfEqualToMobileNumber();

		switch(dataName) {
			case "mailbox":

				config.info = !this.props.personal && (activeMailbox ? activeMailbox.number : "Tap to choose a mailbox");
				config.checked = activeActionInDialplan === activeKey;
				break;

			case "contact":
				let transferIsChosen = (activeActionInDialplan === activeKey &&
				(activeTransfer && activeTransfer.number) && !ifEqualToMobileNumber.activeTransfer);
				config.checked = transferIsChosen;

				config.info =	transferIsChosen ? (activeTransfer && activeTransfer.number) :
						(savedTransfer || "Tap to choose a contact");
				break;

			case "mobile":
				let mobileIsChosen = ((activeActionInDialplan === activeKey) &&
				(activeTransfer && activeTransfer.number) && ifEqualToMobileNumber.activeTransfer);

				console.log(ifEqualToMobileNumber.activeTransfer);

				config.info = mobileNumber;
				config.checked = mobileIsChosen;

				if (mobileIsChosen && ifEqualToMobileNumber.savedTransferNumber) {
					Dialplan.updateAttributesFor("follow.contact", "");
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
		hashHistory.push(this.state.link);
	}

	onChange(e) {
		let name = this.state.name;
		let $el = this.refs["checkbox-" + name];

		$el.checked = !$el.checked || true;

		switch(name) {
			case "contact":
				let contactNumber = Dialplan.getValueByPath("follow.contact");

				if (contactNumber) {
					Dialplan
						._saveFollowToTransfer({
							type: "contact",
							number: contactNumber
						})
						.then(this.props.onChange.bind(this, name));
				} else {
					hashHistory.push('/contacts');
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
				if (this.props.personal) {
					let mailbox = Dialplan._getActiveMailbox();

					if (mailbox && mailbox._id) {
						Dialplan
							._saveFollowToMailbox(mailbox)
							.then(this.props.onChange.bind(this, name));
					} else {
						hashHistory.push('/mailboxes');
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
					className="m-label radio-block"
					htmlFor={this.state.name}
					onTap={this.onChange}
					>
					<input
						ref={"checkbox-" + this.state.name}
						type="radio"
						name="follow"
						onChange={()=>{}}
						checked={this.state.checked}
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