import React, { Component } from 'react';

import CompanyActions from "../../models/CompanyActions";

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
		var newFollowState = {};

		// TODO: don't work
		newFollowState[object.value] = true;
		this.state.Dialplan.follow = newFollowState;

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
					<div className="l-main-content l-dialplan__list">
						<ul>
							{this.state.actions.map((object, i) => {
								return <li key={i} className={object.className}>
									<label className="m-label radio-block" htmlFor={object.value}>

										<input type="radio"
										       name="follow"
										       value={object.value}
										       checked={object.is_on ? "checked" : ""}
										       id={object.value}
										       onChange={this.onChangeDialplanForward.bind(this, object)}/>

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
												<label className="m-label checkbox-block" htmlFor={"action_" + i}>

													<input type="checkbox"
													       name="company[]"
													       checked={object.value.is_on ? "checked": ""}
													       id={"action_" + i}
													       onChange={this.onChangeFlowControl.bind(this, object)}/>

													<div className="checkbox-button"></div>
													<div className="l-dialplan-text">
														<div className="l-dialplan-name">{object.value.label || "1234*" + object.value.short_code}</div>
													</div>
												</label>
											</li>;
										})}
									</ul>
								</div>
							</div>
						}
					})()}
				</div>
			</div>
		);
	}
}