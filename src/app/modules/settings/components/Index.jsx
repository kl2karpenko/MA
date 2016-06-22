import React, {Component} from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'lib/imageLoader';

import { Keyboard, setCurrentFocusedInputTo } from 'components/Keyboard.jsx';

import PinSettings from '../models/PinSettings';

export default class Index extends Component {
	constructor(props) {
		super(props);

		this._load();

		this.state = {
			element: $('input[name=current]').get(0),
			model: PinSettings.settings,
			isValid: false,
			classFocus: setCurrentFocusedInputTo(3, 0),
			value: ""
		};

		this.modelNames = [ "current", "newPin" , "newPinReenter"];

		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this._toggleUsingPin = this._toggleUsingPin.bind(this);
		this._updatePinSettings = this._updatePinSettings.bind(this);
		this._leaveSettings = this._leaveSettings.bind(this);
	}

	_load() {
		return PinSettings.load({
				from: 'pin'
			}).then(this._updatePinSettings.bind(this));
	}

	_updatePinSettings() {
		this.setState({
			model: PinSettings.settings
		});
	}

	componentWillUpdate(t, state) {
		// this._checkForValidPin(state.model.pin);
	}

	_checkForValidPin(pin) {
		let everyIsValid = Object.keys(pin).every((item) => {
			return pin[item] && pin[item].length === 5;
		});
	}

	onFocus(e) {
		let
			index = this.modelNames.indexOf(e.target.name);

		this.setState({
			element: e.target,
			value: e.target.value,
			classFocus: setCurrentFocusedInputTo(3, index)
		});

		return Keyboard.closeKeyBoard(e);
	}

	onChange(newVal) {
		if (newVal.length >= 5) {
			newVal = newVal.substring(0, 5);
		}
		
		PinSettings.updateAttributesFor("pin." + this.state.element.name, newVal);

		this.setState({
			value: newVal
		});

		this._updatePinSettings();
	}

	_toggleUsingPin(e) {
		PinSettings.updateAttributesFor("pin.is_on", e.target.checked);

		this._updatePinSettings();
	}

	_save() {
		return PinSettings.save({
			for: "pin"
		});
	}

	_leaveSettings() {
		this
			._save()
			.then(() => {
				hashHistory.push("/dialplans");
			});
	}

	render() {
		return (
			<div className="l-adaptive-wrapper">
				<div className="l-adaptive l-adaptive-sm l-fixed">
					<div className="m-angle">
						<div className="m-angle-wrapper">
							<div className="m-angle-content">
								<div className="m-angle-top">
									<div className="m-angle-name">
										Settings
									</div>
								</div>
							</div>

							<button className="m-angle__button btn btn-round btn-sm btn-list btn-round-grey" onClick={this._leaveSettings}>
								<img src={imageLoader(require("images/icons/cross-white-big.png"))} alt="Right"/>
							</button>
						</div>
					</div>

					<div className="l-main l-main-settings">
						<div className="l-main-scroll">
							<div className="l-grey l-grey-md">
								<label htmlFor="pin.is_on" className="checkbox-block m-label clearfix">
									<div className="l-grey-header pull-left">
										Password at login
									</div>
									<input
										 type="checkbox"
							       name="pin.is_on"
							       id="pin.is_on"
							       checked={this.state.model.pin.is_on}
							       onChange={this._toggleUsingPin}
									/>
									<div className="checkbox-button pull-right"></div>
								</label>
							</div>

							<div className={"l-settings l-main-content" + (!this.state.model.pin.is_on ? " disabled" : "")}>
								<form action="" name="pinChange">
									<div className="l-settings-group">
										<input
											type="number"
											autoFocus="true"
											onFocus={this.onFocus}
											onChange={this.onChange}
											className={"input-custom" + (this.state.classFocus[0] ? " focus" : "")}
											placeholder="Enter current"
											name="current"
											value={this.state.model.pin.current}
										/>
									</div>
									<div className="l-settings-group">
										<input
											type="number"
											onFocus={this.onFocus}
											onChange={this.onChange}
											className={"input-custom" + (this.state.classFocus[1] ? " focus" : "")}
											placeholder="Enter current"
											name="newPin"
											value={this.state.model.pin.newPin}
										/>
									</div>
									<div className="l-settings-group">
										<input
											type="number"
											onFocus={this.onFocus}
											onChange={this.onChange}
											className={"input-custom" + (this.state.classFocus[2] ? " focus" : "")}
											placeholder="Enter current"
											name="newPinReenter"
											value={this.state.model.pin.newPinReenter}
										/>
									</div>
								</form>
							</div>

							<div className="l-grey">
								<div className="l-grey-header">
									General settings
								</div>
							</div>

							<div className="l-main-content">
								<Link className="btn btn-block btn-block-lg btn-disconnect" to="/">Disconnect app</Link>
							</div>
						</div>
					</div>
				</div>

				<div className={"l-keyboard l-keyboard-fixed"}>
					<Keyboard
						value={this.state.value}
						isValid={this.state.isValid}
						onChange={this.onChange}
						onSubmit={this._save}
					/>
				</div>
			</div>
		);
	}
}