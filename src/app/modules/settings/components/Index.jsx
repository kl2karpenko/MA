import React, {Component} from 'react';
import { Link } from 'react-router';

import imageLoader from 'lib/imageLoader';

import { Keyboard, setCurrentFocusedInputTo } from 'components/Keyboard.jsx';

import PinSettings from '../models/PinSettings';
import Pininput from './item/Pininput.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);

		this._init();

		this.state = {
			element: "",
			model: PinSettings.settings,
			isValid: false,
			classFocus: setCurrentFocusedInputTo(3, 0),
			value: ""
		};

		this.placeholderText = [ "Enter current", "Enter new pincode" , "Reenter new pincode"];
		this.modelNames = [ "current", "newPin" , "newPinReenter"];

		this._onChangeInput = this._onChangeInput.bind(this);
		this._onFocusInput = this._onFocusInput.bind(this);
		this._toggleUsingPin = this._toggleUsingPin.bind(this);
	}

	_init() {
		this._loadResources().then(() => {
			this.setState({
				model: PinSettings.settings
			});
		});
	}

	_loadResources() {
		return PinSettings.load({
			from: 'pin'
		});
	}

	_onFocusInput(e) {
		let
			element = e.target,
			index = this.modelNames.indexOf(e.target.name);

		if (this.state.element !== element) {
			this.setState({
				element: element,
				value: element.value
			});
		}

		this.setState({
			classFocus: setCurrentFocusedInputTo(3, index)
		});

		return Keyboard.closeKeyBoard(e);
	}

	_onChangeInput(newVal) {
		if (newVal.length >= 5) {
			newVal = newVal.substring(0, 5);
		}

		this.state.model.pin[this.state.element.name] = newVal;
		this.state.element.value = newVal;

		this.setState({
			value: newVal,
			model: this.state.model
		});
	}

	_toggleUsingPin(e) {
		this.state.model.is_pin_active = e.target.checked;

		this.setState({
			model: this.state.model
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

							<Link activeClassName="active" className="m-angle__button btn btn-round btn-sm btn-list btn-round-grey" to="/dialplans/list">
								<img src={imageLoader(require("images/icons/cross-white-big.png"))} alt="Right"/>
							</Link>
						</div>
					</div>

					<div className="l-main l-main-settings">
						<div className="l-main-scroll">
							<div className="l-grey l-grey-md">
								<label htmlFor="is_pin_active" className="checkbox-block m-label clearfix">
									<div className="l-grey-header pull-left">
										Password at login
									</div>
									<input
										 type="checkbox"
							       name="is_pin_active"
							       id="is_pin_active"
							       checked={this.state.model.is_pin_active}
							       onChange={this._toggleUsingPin}
									/>
									<div className="checkbox-button pull-right"></div>
								</label>
							</div>

							<div className={"l-settings l-main-content" + (!this.state.model.is_pin_active ? " disabled" : "")}>
								<form action="" name="pinChange">
									{[...Array(3)].map((x, i) =>
										<div className="l-settings-group" key={i}>
											<Pininput
												index={i}
												focus={this.state.classFocus[i]}
												placeholder={this.placeholderText[i]}
												onChange={this._onChangeInput}
												onFocus={this._onFocusInput}
												name={this.modelNames[i]}
												value={this.state.model.pin[this.modelNames[i]]}
											/>
										</div>
									)}
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
						onChange={this._onChangeInput}
					/>
				</div>
			</div>
		);
	}
}