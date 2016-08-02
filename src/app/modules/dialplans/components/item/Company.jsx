import React, { Component }     from 'react';

import CompanyActions           from "../../models/actions/Company";
import Dialplan                 from "models/Dialplan";

import MainScroll               from 'components/layouts/main/Scroll.jsx';

import Follow                   from './actions/Follow.jsx';
import FlowControl              from './actions/FlowControl.jsx';

import { $t }                   from 'lib/locale';

import ReactCSSTransitionGroup  from 'react/lib/ReactCSSTransitionGroup';

/** Import ================================================================== */

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
		let followItems = this.state.actions.map((object, i) => {
				return <ReactCSSTransitionGroup
						key={"follow-" + (object._id || i)}
						transitionName = "visibility"
						transitionAppear = {true}
						transitionAppearTimeout = {600}
						transitionEnter = {true}
						transitionEnterTimeout = {600}
						transitionLeaveTimeout = {20}
						transitionLeave = {true}
					><Follow
					personal={false}
					key={"follow-item-" + i + "-" + Dialplan.getValueByPath("_id")}
					options={object}
					onChange={this.onChangeDialplanForward.bind(this, object)}
				/></ReactCSSTransitionGroup>;
			});

		let flowControls = this.state.Dialplan.actions.origin.items;
		let flowControlsItems = flowControls.map((object, i) => {
			return <ReactCSSTransitionGroup
				key={"flow-control-" + (object._id || i) + "-" + Dialplan.getValueByPath("_id")}
				transitionName = "visibility"
				transitionAppear = {true}
				transitionAppearTimeout = {600}
				transitionEnterTimeout = {600}
				transitionLeaveTimeout = {20}
				transitionEnter = {true}
				transitionLeave = {true}
			><FlowControl
				index={i}
				key={"flow-control-item-" + i}
				options={object}
				in_number={this.state.Dialplan.in_number}
				onChange={this.onChangeFlowControl.bind(this, object)}
			/></ReactCSSTransitionGroup>;
		})

		return (
			<MainScroll>
				<form action="">
					<div className="l-main-content l-dialplan__list">
						<ul>
							{followItems}
						</ul>
					</div>
					{(() => {
						if(flowControls && flowControls.length) {
							return <div>
								<div className="l-grey">
									<div className="l-grey-header">
										{$t("dialplans.flow_control")}
									</div>
								</div>
								<div className="l-dialplan__list l-main-content">
									<ul>
										{flowControlsItems}
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