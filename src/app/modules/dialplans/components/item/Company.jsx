import React, { Component } from 'react';

import CompanyActions from "../../models/actions/CompanyActions";
import Checkbox from 'components/inputs/Checkbox.jsx';

export default class Company extends Component {
	constructor(props) {
		super(props);

		this.defaultActions = CompanyActions.getModel();
		this.state = {
			flowControlId: "",
			haveFlow: props.dialplan.actions && props.dialplan.actions.length,
			Dialplan: props.dialplan,
			actions: this.defaultActions.map((item) => {
				if (props.dialplan.follow[item.value]) {
					item.is_on = true;
				}
				return item;
			})
		};
	}

	_setFollowDialplanState(activeAction) {
		var actions = this.defaultActions.map((item) => {
			if (activeAction.follow[item.value]) {
				item.is_on = true;
			}
			return item;
		});

		this.setState({
			actions: actions
		});
	}

	/* call on change props in parent scope */
	componentWillReceiveProps(props) {
		this.setState({
			haveFlow: props.dialplan.actions && props.dialplan.actions.length,
			Dialplan: props.dialplan
		});
	}

	onChangeDialplanForward(object) {
		var obj = {};

		obj[object.value] = true;

		this.state.Dialplan.follow = obj;

		this._updateDialplan();
	}

	onChangeFlowControl(object) {
		object.value.is_on = !object.value.is_on;

		this._updateDialplan();
	}

	_updateDialplan() {
		this.setState({
			Dialplan: this.state.Dialplan
		});
	}

	render() {
		return (
			<div className="l-main">
				<div className="l-main-scroll">
					<form action="">
						<div className="l-main-content l-dialplan__list">
							<ul>
								{this.state.actions.map((object, i) => {
									return <li key={i} className={object.className}>
										<label className="m-label radio-block" htmlFor={object.value}>
											<input
												type="radio"
												name="follow"
												value={object.value}
												checked={this.state.Dialplan.follow[object.value] ? "checked" : ""}
												id={object.value}
												onChange={this.onChangeDialplanForward.bind(this, object)}
											/>
											<div className="radio-button"></div>
											<div className="l-dialplan-text">
												<div className="l-dialplan-name">{object.name}</div>
												<div className="l-dialplan-info">{object.info}</div>
											</div>
										</label>
									</li>;
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
												return <li key={i} className={object.className}>
													<Checkbox
														id={"action_" + i}
														name="flow_control"
														value={object.action_id}
														checked={object.value.is_on}
														text={(() => {
															return (
																<div className="l-dialplan-text">
																	<div className="l-dialplan-name">{object.value.label || "1234*" + object.value.short_code}</div>
																</div>
															);
														})}
														onChange={this.onChangeFlowControl.bind(this, object)}
														/>
												</li>;
											})}
										</ul>
									</div>
								</div>
							}
						})()}
					</form>
				</div>
			</div>
		);
	}
}