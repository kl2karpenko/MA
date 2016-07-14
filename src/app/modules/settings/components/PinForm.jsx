import React, {Component} from 'react';
import Tappable from 'react-tappable';

import { Keyboard } from 'components/Keyboard.jsx';
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

	_setState(props) {
		this.setState({
			classFocus: props.pin.classFocus,
			active: props.pin.active,
			created: props.pin.created,
			created_copy: props.pin.created_copy,
			messages: {
				active: {
					show: props.pin.messages.active,
					text: "Wrong pin code"
				},
				created: {
					show: props.pin.messages.created,
					text: "Code didn't match"
				}
			}
		});
	}

	componentWillReceiveProps(props) {
		this._setState(props);
	}

	onTouch(index, e) {
		Keyboard.closeKeyBoard(e);

		this.setState({
			keyboardIsVisible: true
		});

		return this.props.onTouch.call(this.state.parent, index, e);
	}

	_toggleUsingPin() {
		let isPinOn = !this.state.is_on;

		this.setState({
			is_on: isPinOn
		});

		if (!isPinOn) {
			this.state.parent.setPin();

			this.state.parent.setState({
				keyboardIsVisible: false,
				type: "pin"
			});

			this.state.parent._save();
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
						onChange={function() {}}
					/>
					<Tappable
						pressDelay={500}
						component="div"
						className="checkbox-button pull-right"
						onTap={this._toggleUsingPin}
					/>
				</label>
			</div>

			<div className={"l-settings l-main-content" + (!this.state.is_on ? " disabled" : "")}>
				<form action="" name="pinChange">
					<div className={"l-settings-group" + (Storage.existValue('pin') ? "" : " hidden")}>
						<Tappable
							component="input"
							type="number"
							pressDelay={500}
							onTap={this.onTouch.bind(this, 0)}
							onChange={this.onChange}
							className={"input-custom" + (this.state.classFocus[0] ? " focus" : "") + (this.state.messages.active.show ? " error" : "")}
							placeholder="Enter current"
							name="active"
							value={this.state.active}
						/>
						<span style={{display: (this.state.messages.active.show ? "block" : "none")}}>{this.state.messages.active.text}</span>
					</div>
					<div className="l-settings-group">
						<Tappable
							component="input"
							type="number"
							pressDelay={500}
							onTap={this.onTouch.bind(this, 1)}
							onChange={this.onChange}
							className={"input-custom" + (this.state.classFocus[1] ? " focus" : "") + (this.state.messages.created.show ? " error" : "")}
							placeholder="Enter new pincode"
							name="created"
							value={this.state.created}
						/>
						<span style={{display: (this.state.messages.created.show ? "block" : "none")}}>{this.state.messages.created.text}</span>
					</div>
					<div className="l-settings-group">
						<Tappable
							component="input"
							type="number"
							pressDelay={500}
							onTap={this.onTouch.bind(this, 2)}
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