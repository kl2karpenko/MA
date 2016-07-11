import React, {Component} from 'react';

import { Keyboard, setCurrentFocusedInputTo } from 'components/Keyboard.jsx';
import Storage from "models/Storage";

export default class PinForm extends Component {
	constructor(props) {
		super(props);

		this.state = $.extend(props.pin, {
			keyboardIsVisible: false,
			parent: props.parentScope
		});

		this._toggleUsingPin = this._toggleUsingPin.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			classFocus: props.pin.classFocus,
			active: props.pin.active,
			created: props.pin.created,
			created_copy: props.pin.created_copy,
			messages: {
				active: {
					show: props.pin.messages.active,
					text: "Current value didn't not match"
				},
				created: {
					show: props.pin.messages.created,
					text: "Pin code value didn't match"
				}
			}
		});
	}

	onFocus(index, e) {
		Keyboard.closeKeyBoard(e);

		this.setState({
			keyboardIsVisible: true
		});

		return this.props.onFocus.call(this.state.parent, index, e);
	}

	_toggleUsingPin(e) {
		let isPinOn = e.target.checked;

		this.setState({
			is_on: isPinOn
		});

		if (!isPinOn) {
			this.state.parent.setState({
				keyboardIsVisible: false
			});
		}
	}

	render() {
		return (<div>
			<div className="l-grey l-grey-md">
				<label htmlFor="pin.is_on" className="checkbox-block m-label clearfix">
					<div className="l-grey-header pull-left">
						Password at login
					</div>
					<input
						type="checkbox"
						name="pin.is_on"
						id="pin.is_on"
						checked={this.state.is_on}
						onChange={this._toggleUsingPin}
					/>
					<div className="checkbox-button pull-right"></div>
				</label>
			</div>

			<div className={"l-settings l-main-content" + (!this.state.is_on ? " disabled" : "")}>
				<form action="" name="pinChange">
					<div className={"l-settings-group" + (Storage.existValue('pin') ? "" : " hidden")}>
						<input
							type="number"
							onFocus={this.onFocus.bind(this, 0)}
							onChange={this.onChange}
							className={"input-custom" + (this.state.classFocus[0] ? " focus" : "") + (this.state.messages.active.show ? " error" : "")}
							placeholder="Enter current"
							name="active"
							value={this.state.active}
						/>
						<span style={{display: (this.state.messages.active.show ? "block" : "none")}}>{this.state.messages.active.text}</span>
					</div>
					<div className="l-settings-group">
						<input
							type="number"
							onFocus={this.onFocus.bind(this, 1)}
							onChange={this.onChange}
							className={"input-custom" + (this.state.classFocus[1] ? " focus" : "") + (this.state.messages.created.show ? " error" : "")}
							placeholder="Enter new pincode"
							name="created"
							value={this.state.created}
						/>
						<span style={{display: (this.state.messages.created.show ? "block" : "none")}}>{this.state.messages.created.text}</span>
					</div>
					<div className="l-settings-group">
						<input
							type="number"
							onFocus={this.onFocus.bind(this, 2)}
							onChange={this.onChange}
							className={"input-custom" + (this.state.classFocus[2] ? " focus" : "") + (this.state.messages.created.show ? " error" : "")}
							placeholder="Reenter new pincode"
							name="created_copy"
							value={this.state.created_copy}
						/>
						<span style={{display: (this.state.messages.created.show ? "block" : "none")}}>{this.state.messages.created.text}</span>
					</div>
				</form>
			</div>
		</div>);
	}
}