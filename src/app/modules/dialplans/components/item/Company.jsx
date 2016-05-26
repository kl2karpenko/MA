import React, { Component } from 'react';
import { Link } from 'react-router';

import Actions from "models/Actions";

export default class Company extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dialplan: props.dialplan.Model,
			flowControlId: "",
			haveFlow: props.dialplan.actions && props.dialplan.actions.length
		};

		this.actions = [
			{
				name: "Forward to my mobile",
				info: "+38093 403 23 79",
				className: "",
				value: "mobile"
			},
			{
				name: "Forward to voicemail",
				info: "",
				className: "with-search",
				value: "voicemail"
			},
			{
				name: "Forward to",
				info: "Tap to choose a contact",
				className: "with-search",
				value: "contact"
			}
		];

		Actions.load().then(() => {
			this.setState({
				flowControlId: Actions.findByField('action', 'flow_control')
			});
		});
	}

	componentWillMount() {
		this.setState({
			haveFlow: this.state.dialplan.actions && this.state.dialplan.actions.length
		});

		if (this.state.haveFlow) {
			this.setState({
				flowControlId: Actions.Model.findByField('action', 'flow_control', '_id')
			});
		}
	}

	render() {
		return (
			<div className="l-main">
				<div className="l-dialplan">
					<div className="l-dialplan__list">
						<ul>
							{this.actions.map(function(object, i){
								return <li key={i} className={object.className}>
									<label htmlFor={object.value}>
										<input type="radio" name="personal" value={object.value} id={object.value}/>
										<div className="l-dialplan-radio"></div>
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
						if(this.state.haveFlow) {
							return <div>
								<div className="l-dialplan-row">
									Flow Control
								</div>
								<div className="l-dialplan__list">
									<ul>
										{this.state.dialplan.actions.map((object, i) => {
											console.log(object, this.state.dialplan)
											if (object.action_id === this.state.flowControlId) {
												return <li key={i} className={object.className}>
													<label htmlFor={"action_" + i}>
														<input type="checkbox" name="company[]" checked={object.value.is_on} id={"action_" + i}/>
														<div className="l-dialplan-check"></div>
														<div className="l-dialplan-text">
															<div className="l-dialplan-name">{object.value.label || "1234*" + object.value.short_code}</div>
														</div>
													</label>
												</li>;
											}
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