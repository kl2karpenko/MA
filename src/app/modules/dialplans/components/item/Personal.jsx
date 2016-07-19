import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import config from 'envConfig';

import PhoneNumber from "models/PhoneNumber";

import PersonalActions from "../../models/actions/Personal";
import Follow from './actions/Follow.jsx';

import Dialplan from "models/Dialplan";

export default class Personal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplan: Dialplan.getModel(),
			actions: PersonalActions.getModel()
		};
	}

	static getUserNumber() {
		return config.process.isProd() ? navigator.notification.prompt : prompt;
	}

	/* call on change props in parent scope */
	componentWillReceiveProps() {
		this.setState({
			Dialplan: Dialplan.getModel()
		});
	}

	static _getUserNumber() {
		let phoneValue = PhoneNumber.getValueByPath('value');

		if (!phoneValue) {
			if (config.process.isIOS() || config.process.isDev() ) {
				phoneValue = Personal.getUserNumber("Please enter your phone number", false);
				if (phoneValue) {
					PhoneNumber.updateAttributesFor('value', phoneValue);
					PhoneNumber.save();
				}
			}
		}

		return phoneValue;
	}

	onChange(object) {
		switch(object.name) {
			case "contact":
				let contact = Dialplan._getActiveTransfer();

				if (contact.number) {
					Dialplan
						._saveFollowToTransfer({
							type: "contact",
							number: contact.number
						})
						.then(this._updateDialplan.bind(this));
				} else {
					hashHistory.push('/contacts');
				}
				break;

			case "mobile":
				let number = Personal._getUserNumber();

				if (number) {
					Dialplan
						._saveFollowToTransfer({
							type: "contact",
							number: number
						})
						.then(this._updateDialplan.bind(this));
				}
				break;

			case "mailbox":
				Dialplan
					._saveFollowToMailbox()
					.then(this._updateDialplan.bind(this));
				break;

			default:
				Dialplan
					._saveFollowToOrigin()
					.then(this._updateDialplan.bind(this));
				break;
		}
	}

	_updateDialplan() {
		this.setState({
			Dialplan: Dialplan.getModel()
		});
	}

	render() {
		return (
			<div className="l-main">
				<div className="l-main-scroll">
					<div className="l-dialplan__list l-main-content">
						<ul>
							{this.state.actions.map((object, i) => {
								return <Follow
									personal={true}
									key={i}
									options={object}
									onChange={this.onChange.bind(this, object)}
								/>;
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}