import React, {Component} from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'imageLoader';

import AdaptiveFixed from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

import Angle from 'components/modules/angle/Index.jsx';

import MainScroll from 'components/layouts/main/Scroll.jsx';

import { Keyboard, setCurrentFocusedInputTo } from 'components/Keyboard.jsx';

import PinSettings from '../models/PinSettings';
import Dialplan from "models/Dialplan";

export default class Index extends Component {
	constructor(props) {
		super(props);

		this._load();

		this.state = {
			element: $('input[name=active]').get(0),
			model: PinSettings.settings,
			isValid: false,
			classFocus: setCurrentFocusedInputTo(3, 0),
			value: ""
		};

		this.modelNames = [ "active", "created" , "created_copy"];

		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this._toggleUsingPin = this._toggleUsingPin.bind(this);
		this._updatePinSettings = this._updatePinSettings.bind(this);
		this._leaveSettings = this._leaveSettings.bind(this);
	}

	_load() {
		return PinSettings
			.load({
				from: 'pin'
			})
			.then(this._updatePinSettings.bind(this));
	}

	_updatePinSettings() {
		this.setState({
			model: PinSettings.settings,
			isValid: PinSettings._checkIsValid()
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
		if (!this.state.model.pin.is_on) {
			return;
		}

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
				hashHistory.push('/dialplans/' + Dialplan.getValueByPath("_id"));
			})
			.fail(() => {
				console.error('fail save Pincode');
			});
	}

	render() {
		Keyboard.closeKeyBoard();

		return (<AdaptiveWrapper>
			<AdaptiveFixed class="l-adaptive-sm">
				<Angle>
					<div className="m-angle-content">
						<div className="m-angle-top">
							<div className="m-angle-name">
								Settings
							</div>
						</div>
					</div>

					<button className="m-angle__button btn btn-round btn-sm btn-right btn-round-grey" onClick={this._leaveSettings}>
						<img src={imageLoader(require("images/icons/cross-white-big.png"))} alt="Right"/>
					</button>
				</Angle>

				<MainScroll class="l-main-settings">
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
									name="active"
									value={this.state.model.pin.active}
								/>
							</div>
							<div className="l-settings-group">
								<input
									type="number"
									onFocus={this.onFocus}
									onChange={this.onChange}
									className={"input-custom" + (this.state.classFocus[1] ? " focus" : "")}
									placeholder="Enter new pincode"
									name="created"
									value={this.state.model.pin.created}
								/>
							</div>
							<div className="l-settings-group">
								<input
									type="number"
									onFocus={this.onFocus}
									onChange={this.onChange}sc
									className={"input-custom" + (this.state.classFocus[2] ? " focus" : "")}
									placeholder="Reenter new pincode"
									name="created_copy"
									value={this.state.model.pin.created_copy}
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
						<Link className="btn btn-block btn-block-lg btn-disconnect" to="/authorize">Disconnect app</Link>
					</div>
				</MainScroll>
			</AdaptiveFixed>

			<div className="l-keyboard l-keyboard-fixed">
				<Keyboard
					value={this.state.value}
					isValid={this.state.isValid}
					onChange={this.onChange}
					onSubmit={this._save}
				/>
			</div>
		</AdaptiveWrapper>
		);
	}
}