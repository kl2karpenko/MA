import React, { Component } from 'react';

import Dialplan from "models/Dialplan";

export default class Company extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// dialplan: props.dialplan.Model,
			flowControlId: "",
			haveFlow: props.dialplan.Model.actions && props.dialplan.Model.actions.length
		};

		this.actions = [
			{
				name: "Follow original dialplan",
				info: "",
				className: "",
				value: "original"
			},
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
	}

	onChangeDialplanForward() {

	}

	onChangeFlowControl() {

	}

	render() {
		return (
			<div className="l-main">
				<div className="l-dialplan">
					<div className="l-dialplan__list">
						<ul>
							{this.actions.map((object, i) => {
								return <li key={i} className={object.className}>
									<label htmlFor={object.value}>
										<input type="radio" name="personal" value={object.value} id={object.value} onChange={this.onChangeDialplanForward}/>
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
						if(Dialplan.Model.actions && Dialplan.Model.actions.length) {
							return <div>
								<div className="l-dialplan-row">
									Flow Control
								</div>
								<div className="l-dialplan__list">
									<ul>
										{Dialplan.Model.actions.map((object, i) => {
											return <li key={i} className={object.className}>
												<label htmlFor={"action_" + i}>
													<input type="checkbox" name="company[]" id={"action_" + i} onChange={this.onChangeFlowControl}/>
													<div className="l-dialplan-check"></div>
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