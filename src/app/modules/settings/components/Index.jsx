import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import Tappable from 'react-tappable';

import imageLoader from 'imageLoader';

import AdaptiveFixed from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';
import Angle from 'components/modules/angle/Index.jsx';

import PinForm from './PinForm.jsx';

import MainScroll from 'components/layouts/main/Scroll.jsx';

import { Keyboard, setCurrentFocusedInputTo } from 'components/Keyboard.jsx';

import Pin from "models/Pin";
import PhoneNumber from "models/PhoneNumber";
import Dialplan from "models/Dialplan";
import Storage from "models/Storage";

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			type: "",
			element: $('input[name=active]').get(0),
			keyboardIsVisible: false,
			isValid: false,
			value: "",
			phoneNumber: PhoneNumber.getValueByPath('value')
		};

		this.setPin();

		this._save = this._save.bind(this);
		this.closeCustomKeyboard = this.closeCustomKeyboard.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	setPin() {
		this.pin = {
			is_on: Storage.existValue('pin'),
			active: Storage.getValue('pin') ? "" : false,
			created: "",
			created_copy: "",
			classFocus: setCurrentFocusedInputTo(4, null),
			messages: {
				active: false,
				created: false
			}
		};
	}

	closeCustomKeyboard() {
		this.setState({
			keyboardIsVisible: false
		});
	}

	_save() {
		if (this.state.type === "pin") {
			Pin.updateAttributesFor('value', this.pin.created);

			return Pin
				.save()
				.then(() => {
					this.closeCustomKeyboard();
					this.setPin();
				});
		} else if (this.state.type === "phone") {
			PhoneNumber.updateAttributesFor('value', this.state.phoneNumber);

			return PhoneNumber
				.save()
				.then(() => {
					this.closeCustomKeyboard();
				});
		}
	}

	onChange(newVal) {
		if (this.state.element.name === "phone") {
			this.setState({
				type: "phone",
				value: newVal,
				phoneNumber: newVal,
				isValid: newVal !== "" && (PhoneNumber.getValueByPath('value') !== newVal)
			});
		} else {
			if (newVal.length >= 5) {
				newVal = newVal.substring(0, 5);
			}

			this.pin[this.state.element.name] = newVal;

			this._addValidation();
			this.setState({
				type: "pin",
				value: newVal,
				isValid: this._checkIsValid()
			});
		}
	}

	_addValidation() {
		let model = this.pin;
		let hadPrevValue = Storage.existValue('pin');

		if (hadPrevValue && model.active.length === 5) {
			this.pin.messages.active = Storage.getValue('pin') !== model.active;
		}

		if (model.created.length === 5 && model.created_copy.length === 5) {
			this.pin.messages.created = model.created !== model.created_copy;
		}

		if (model.active.length === 0) {
			this.pin.messages.active = false;
		}
		if (model.created.length === 0 || model.created_copy.length === 0) {
			this.pin.messages.created = false;
		}
	}

	_checkIsValid() {
		let
			model = this.pin,
			modelCopy = [],
			hadPrevValue = Storage.existValue('pin');

		if (model.created === model.created_copy) {
			if (hadPrevValue) {
				if (Storage.getValue('pin') === model.active) {
					modelCopy.push(model.active);
				} else {
					return false;
				}
			}

			modelCopy.push(model.created);
			modelCopy.push(model.created_copy);

			return modelCopy.every((item) => {
				return item && item.length === 5;
			});
		} else {
			return false;
		}

		return true;
	}

	onTouch(index, e) {
		setTimeout(function () {
			Keyboard.closeKeyBoard();
		}, 0);

		this.pin.classFocus = setCurrentFocusedInputTo(4, index);

		this.setState({
			element: e.target,
			value: e.target.value,
			keyboardIsVisible: true,
			type: e.target.name == "phone" ? "phone" : "pin"
		});

		return Keyboard.closeKeyBoard(e);
	}

	static _leave() {
		hashHistory.push('/dialplans/' + Dialplan.getValueByPath("_id"));
	}

	static _disconnect() {
		hashHistory.push('/authorize');
		location.reload();
	}

	render() {
		return (
			<AdaptiveWrapper class="l-adaptive-sm">
				<Angle>
					<div className="m-angle-content">
						<div className="m-angle-top">
							<div className="m-angle-name">
								Settings
							</div>
						</div>
					</div>

					<Tappable
						pressDelay={500}
						component="button"
						className="m-angle__button btn btn-round btn-sm btn-right btn-round-grey"
						onTap={Index._leave}
						>
						<img src={imageLoader(require("images/icons/cross-white-big.png"))} alt="Quit settings"/>
					</Tappable>
				</Angle>
			<AdaptiveFixed>

				<MainScroll class={"l-main-settings" + (this.state.keyboardIsVisible ? " keyboardIsVisible" : "")}>
					<PinForm
						pin={this.pin}
						onTouch={this.onTouch}
						parentScope={this}
					/>
					
					<div className="l-grey">
						<div className="l-grey-header">
							Personal phone number
						</div>
					</div>

					<div className="l-main-content">
						<div className="l-settings-group">
							<Tappable
								pressDelay={500}
								component="input"
								type="tel"
								className={"input-custom" + (this.pin.classFocus[3] ? " focus" : "")}
								placeholder="Please enter your telephone number"
								onTap={this.onTouch.bind(this, 3)}
								onChange={function() {}}
								name="phone"
								value={this.state.phoneNumber}
								defaultValue={this.state.phoneNumber}
							/>
						</div>
					</div>

					<div className="l-grey">
						<div className="l-grey-header">
							General settings
						</div>
					</div>

					<div className="l-main-content">
						<Tappable
							pressDelay={500}
							component="button"
		          className="btn btn-block btn-block-lg btn-disconnect"
		          onTap={Index._disconnect}
						>
							Disconnect app
						</Tappable>
					</div>
				</MainScroll>
			</AdaptiveFixed>

			<div className={"l-keyboard l-keyboard-fixed" + (this.state.keyboardIsVisible ? "" : " hiden")}>
				<Keyboard
					value={this.state.value}
					isValid={this.state.isValid}
					element={this.state.element}
					onChange={this.onChange}
					onSubmit={this._save}
				/>
			</div>
		</AdaptiveWrapper>
		);
	}
}