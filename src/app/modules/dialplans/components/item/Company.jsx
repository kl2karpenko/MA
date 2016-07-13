import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import config from 'envConfig';

import CompanyActions from "../../models/actions/Company";

import Dialplan from "models/Dialplan";

import MainScroll from 'components/layouts/main/Scroll.jsx';

import Follow from './actions/Follow.jsx';
import FlowControl from './actions/FlowControl.jsx';
import Storage from "models/Storage";

export default class Company extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplan: Dialplan.getModel(),
			actions: CompanyActions.getModel()
		};
	}

	_getNumber() {
		let phoneValue = Storage.getValue('phone');

		if (!phoneValue) {
			if (config.process.isIOS() || config.process.isDev() || config.process.isLocal() ) {
				phoneValue = prompt("Please enter your phone number");
				phoneValue && Storage.setValue('phone', phoneValue);
			}
		}

		return phoneValue;
	}

	onChangeDialplanForward(object) {
		switch(object.name) {
			case "contact":
				let contact = Dialplan.getValueByPath('follow.contact');

				if (contact.value.number) {
					Dialplan.saveForFollowTo("contact", contact.value);
					this._updateDialplan();
				} else {
					hashHistory.push('/contacts');
				}
				break;
			case "mailbox":
				let mailbox = Dialplan.getValueByPath('follow.mailbox');

				if (mailbox.value._id) {
					Dialplan.saveForFollowTo("mailbox", mailbox.value);
					this._updateDialplan();
				} else {
					hashHistory.push('/mailboxes');
				}
				break;
			case "mobile":
				let number = this._getNumber();

				if (number) {
					Dialplan.saveForFollowTo("mobile", {
						number: number
					});
					this._updateDialplan();
				}
				break;
			default:
				Dialplan.saveForFollowTo(object.name);
				this._updateDialplan();
				break;
		}
	}

	onChangeFlowControl(object) {
		object.is_on = !object.is_on;

		this._updateDialplan();
		console.log(Dialplan.getModel(), 'Dialplan.getModel()');

		Dialplan.saveForFlowControl(object);
	}

	_updateDialplan() {
		this.setState({
			Dialplan: Dialplan.getModel()
		});
	}

	render() {
		return (
			<MainScroll>
				<form action="">
					<div className="l-main-content l-dialplan__list">
						<ul>
							{this.state.actions.map((object, i) => {
								return <Follow
									personal={false}
									key={i}
									options={object}
									onChange={this.onChangeDialplanForward.bind(this, object)}
								/>;
							})}
						</ul>
					</div>
					{(() => {
						if(this.state.Dialplan.actions && this.state.Dialplan.actions.length) {
							return <div>
								<div className="l-grey">
									<div className="l-grey-header">
										Flow Control
									</div>
								</div>
								<div className="l-dialplan__list l-main-content">
									<ul>
										{this.state.Dialplan.actions.map((object, i) => {
											return <FlowControl
												index={i}
												key={i}
												options={object}
												in_number={this.state.Dialplan.in_number}
												onChange={this.onChangeFlowControl.bind(this, object)}
											/>;
										})}
									</ul>
								</div>
							</div>
						}
					})()}
				</form>
			</MainScroll>
		);
	}
}