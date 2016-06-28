import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import CompanyActions from "../../models/actions/CompanyActions";

import Dialplan from "models/Dialplan";
import Mailbox from "models/Mailbox";

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

	_reset() {
		Mailbox.resetToDefault();
	}

	onChangeDialplanForward(object) {
		this._reset();

		if(object.value === "contact") {
			hashHistory.push('/contacts');
		} else if(object.value === "voicemail") {
			hashHistory.push('/mailboxes');
		} else {
			Dialplan._followTo(object.value, true);
		}

		this._updateDialplan();
	}

	onChangeFlowControl(object) {
		object.value.is_on = !object.value.is_on;

		this._updateDialplan();
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