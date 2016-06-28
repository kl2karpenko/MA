import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Dialplan from "models/Dialplan";
import Mailbox from "models/Mailbox";

export default class Follow extends Component {
	constructor(props) {
		super(props);

		this.state = props.options;
	}

	componentWillReceiveProps() {
		this._updateData();
	}

	_updateData() {
		let
			follow = Dialplan.getModel().follow,
			mailboxId = follow.voicemail;

		if (follow[this.state.value]) {
			this.setState({
				is_on: true
			})
		}

		switch(this.state.value) {
			case "voicemail":
				if (mailboxId && !this.state.personal) {
					Mailbox.load({
						id: mailboxId
					}).then(() => {
						this._setInfoText(Mailbox._getName());
					})
				} else {
					this._setInfoText("");
				}
				break;
			case "contact":
				this._setInfoText("Tap to choose a contact");
				break;
			case "original":
				this._setInfoText("");
				break;
			case "mobile":
				this._setInfoText("+38 093 403 23 79");
				break;
		}
	}

	_setInfoText(value) {
		this.setState({
			info: value
		});
	}

	render() {
		return (
			<li className={this.state.className}>
				<label className="m-label radio-block" htmlFor={this.state.value}>
					<input
						type="radio"
						name="follow"
						value={this.state.value}
						checked={Dialplan.getModel().follow[this.state.value] ? "checked" : ""}
						id={this.state.value}
						onChange={this.props.onChange}
						/>
					<div className="radio-button"></div>
					<div className="l-dialplan-text">
						<div className="l-dialplan-name">{this.state.name}</div>
						<div className="l-dialplan-info">{this.state.info}</div>
					</div>
				</label>
			</li>
		);
	}
}