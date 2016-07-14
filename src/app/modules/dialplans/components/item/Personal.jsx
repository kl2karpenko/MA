import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import config from 'envConfig';

import Storage from "models/Storage";

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

	/* call on change props in parent scope */
	componentWillReceiveProps() {
		this.setState({
			Dialplan: Dialplan.getModel()
		});
	}

	_getNumber() {
		let phoneValue = Storage.getValue('phone');

		if (!phoneValue) {
			if (config.process.isIOS() || config.process.isDev() ) {
				phoneValue = prompt("Please enter your phone number");
				phoneValue && Storage.setValue('phone', phoneValue);
			}
		}

		return phoneValue;
	}

	onChange(object) {
		switch(object.name) {
			case "contact":
				let contact = Dialplan.getValueByPath('follow.contact');

				if (contact.value.number) {
					Dialplan.saveForFollowTo("contact", contact.value).then(() => {
						this._updateDialplan();
					});
				} else {
					hashHistory.push('/contacts');
				}
				break;
			case "mobile":
				let number = this._getNumber();

				console.log('set for number', number);

				if (number) {
					Dialplan.saveForFollowTo("mobile", {
						number: number
					}).then(() => {
						this._updateDialplan();
					});
				}
				break;
			default:
				Dialplan.saveForFollowTo(object.name).then(() => {
					this._updateDialplan();
				});
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