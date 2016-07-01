import React, { Component } from 'react';

import config from 'envConfig';

import Dialplan from "models/Dialplan";

export default class Follow extends Component {
	constructor(props) {
		super(props);

		props.options.mobileNumber = "";
		props.options.info = this._configInfo(props.options.name);

		this.state = props.options;
	}

	componentWillReceiveProps() {
		config.mobileSIMNumber().done((number) => {
			this.setState({
				mobileNumber: number,
				info: this._configInfo(this.state.name)
			});
		});
	}

	_configInfo(dataName) {
		let
			info = "";

		switch(dataName) {
			case "voicemail":
				info = Dialplan.getValueByPath("follow.voicemail.value.name") || "Tap to choose a mailbox";
				break;
			case "contact":
				info = Dialplan.getValueByPath("follow.contact.value.name") || "Tap to choose a contact";
				break;
			// TODO: didn't work mobile number when came from list!!!!
			case "mobile":
				info = Dialplan.getValueByPath("follow.mobile.value") || this.state && this.state.mobileNumber;
				break;
			default:
				info = "";
				break; 
		}

		return info;
	}

	render() {
		return (
			<li className={this.state.className}>
				<label className="m-label radio-block" htmlFor={this.state.name}>
					<input
						type="radio"
						name="follow"
						value={this.state.name}
						checked={Dialplan.getValueByPath("follow." + this.state.name + ".selected") ? "checked" : ""}
						id={this.state.name}
						onChange={this.props.onChange}
						/>
					<div className="radio-button"></div>
					<div className="l-dialplan-text">
						<div className="l-dialplan-name">{this.state.title}</div>
						<div className="l-dialplan-info">{this.state.name === "mobile" ? this.state.mobileNumber || this.state.info : this.state.info}</div>
					</div>
				</label>
			</li>
		);
	}
}