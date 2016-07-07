import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import CompanyActions from "../../models/actions/Company";

import Dialplan from "models/Dialplan";

import MainScroll from 'components/layouts/main/Scroll.jsx';

import Follow from './actions/Follow.jsx';
import FlowControl from './actions/FlowControl.jsx';

export default class Company extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplan: Dialplan.getModel(),
			actions: CompanyActions.getModel()
		};
	}

	onChangeDialplanForward(object) {
		switch(object.name) {
			case "contact":
				let contact = Dialplan.getValueByPath('follow.contact');

				if (contact.value.number) {
					Dialplan.saveForFollowTo("contact", contact.value);
				} else {
					hashHistory.push('/contacts');
				}
				break;
			case "mailbox":
				let mailbox = Dialplan.getValueByPath('follow.mailbox');

				if (mailbox.value._id) {
					Dialplan.saveForFollowTo("mailbox", mailbox.value);
				} else {
					hashHistory.push('/mailboxes');
				}
				break;
			case "mobile":
				Dialplan.saveForFollowTo("mobile", {
					number: object.info
				});
				break;
			default:
				Dialplan.saveForFollowTo(object.name);
				break;
		}

		this._updateDialplan();
	}

	onChangeFlowControl(object) {
		object.value.is_on = !object.value.is_on;

		this._updateDialplan();
		Dialplan.saveForFlowControl(object.name);
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