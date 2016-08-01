import React, { Component } from 'react';
import { hashHistory }      from 'react-router';

import CompanyActions       from "../../models/actions/Company";
import Dialplan             from "models/Dialplan";
import PhoneNumber          from "models/PhoneNumber";

import MainScroll           from 'components/layouts/main/Scroll.jsx';

import Follow               from './actions/Follow.jsx';
import FlowControl          from './actions/FlowControl.jsx';

export default class Company extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplan: Dialplan.getModel(),
			actions: CompanyActions.getModel()
		};
	}

	onChangeDialplanForward() {
		this._updateDialplan();
	}

	onChangeFlowControl(object) {
		object.is_on = !object.is_on;

		Dialplan
			.saveForFlowControl(object)
			.then(this._updateDialplan.bind(this));
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
						let flowControls = this.state.Dialplan.actions.origin.items;

						if(flowControls && flowControls.length) {
							return <div>
								<div className="l-grey">
									<div className="l-grey-header">
										Flow Control
									</div>
								</div>
								<div className="l-dialplan__list l-main-content">
									<ul>
										{flowControls.map((object, i) => {
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