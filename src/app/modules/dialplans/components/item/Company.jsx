import React, { Component } from 'react';

export default class Company extends Component {
	constructor(props) {
		super(props);

		this.state = {
			flowControlId: "",
			haveFlow: props.dialplan.actions && props.dialplan.actions.length,
			Dialplan: props.dialplan
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
				<div className="l-main-scroll">
					<div className="l-main-content l-dialplan__list">
						<ul>
							{this.actions.map((object, i) => {
								return <li key={i} className={object.className}>
									<label className="m-label radio-block" htmlFor={object.value}>
										<input type="radio" name="personal" value={object.value} id={object.value} onChange={this.onChangeDialplanForward}/>
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
													<input type="checkbox" name="company[]" id={"action_" + i} onChange={this.onChangeFlowControl}/>
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