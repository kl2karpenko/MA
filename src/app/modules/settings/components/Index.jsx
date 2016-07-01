import React, {Component} from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'imageLoader';

import AdaptiveFixed from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';
import Angle from 'components/modules/angle/Index.jsx';

import MainScroll from 'components/layouts/main/Scroll.jsx';

import { Keyboard, setCurrentFocusedInputTo } from 'components/Keyboard.jsx';

import PinSettings from '../models/PinSettings';
import Pin from "models/Pin";
import Dialplan from "models/Dialplan";
import Storage from "models/Storage";

let defaultPIN = "00000";

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			element: $('input[name=active]').get(0),
			pin: {
				is_on: !!Storage.getValue('pin'),
				active: !Storage.getValue('pin') ? defaultPIN : "",
				created: "",
				created_copy: ""
			},
			isValid: false,
			classFocus: setCurrentFocusedInputTo(3, 0),
			value: ""
		};

		PinSettings.updateAttributesFor("pin.active", !Storage.getValue('pin') ? defaultPIN : "");
		PinSettings.updateAttributesFor("pin.is_on", !!Storage.getValue('pin'));

		this.modelNames = [ "active", "created" , "created_copy"];

		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this._save = this._save.bind(this);
		this._toggleUsingPin = this._toggleUsingPin.bind(this);
		this._updatePinSettings = this._updatePinSettings.bind(this);
		this._leaveSettings = this._leaveSettings.bind(this);
	}

	_updatePinSettings() {
		let pinModel = PinSettings.getModel().pin;

		this.setState({
			pin: pinModel,
			isValid: PinSettings._checkIsValid() && pinModel.is_on
		});
	}

	onFocus(e) {
		this.setState({
			element: e.target,
			value: e.target.value,
			classFocus: setCurrentFocusedInputTo(3, this.modelNames.indexOf(e.target.name))
		});

		return Keyboard.closeKeyBoard(e);
	}

	onChange(newVal) {
		if (!this.state.pin.is_on) {
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
		Pin.setValueByPath('value', this.state.pin.created);
		Pin.messenger.success('Save pin code, current = ' + this.state.pin.created);

		return Pin.save();
	}

	_leave() {
		PinSettings.assignAttributes(PinSettings._getDefaultAttributes());

		hashHistory.push('/dialplans/' + Dialplan.getValueByPath("_id"));
	}

	_leaveSettings() {
		if (Pin._isDirty()) {
			this
				._save()
				.then(this._leave);
		} else {
			this._leave();
		}
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
								checked={this.state.pin.is_on}
								onChange={this._toggleUsingPin}
							/>
							<div className="checkbox-button pull-right"></div>
						</label>
					</div>

					<div className={"l-settings l-main-content" + (!this.state.pin.is_on ? " disabled" : "")}>
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
									value={this.state.pin.active}
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
									value={this.state.pin.created}
								/>
							</div>
							<div className="l-settings-group">
								<input
									type="number"
									onFocus={this.onFocus}
									onChange={this.onChange}
									className={"input-custom" + (this.state.classFocus[2] ? " focus" : "")}
									placeholder="Reenter new pincode"
									name="created_copy"
									value={this.state.pin.created_copy}
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