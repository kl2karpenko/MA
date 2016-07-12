import React, {Component} from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'imageLoader';

import AdaptiveFixed from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';
import Angle from 'components/modules/angle/Index.jsx';

import PinForm from './PinForm.jsx';

import MainScroll from 'components/layouts/main/Scroll.jsx';

import { Keyboard, setCurrentFocusedInputTo } from 'components/Keyboard.jsx';

import Pin from "models/Pin";
import Dialplan from "models/Dialplan";
import Storage from "models/Storage";

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			element: $('input[name=active]').get(0),
			keyboardIsVisible: false,
			isValid: false,
			value: "",
			phoneNumber: Storage.getValue('phone') || ""
		};

		console.log(Storage.getValue('phone'));

		this.setPin();

		this._save = this._save.bind(this);
		this.closeCustomKeyboard = this.closeCustomKeyboard.bind(this);
		this.onChange = this.onChange.bind(this);
		this._enterPhone = this._enterPhone.bind(this);
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
		Pin.updateAttributesFor('value', this.pin.created);

		return Pin
				.save()
				.then(() => {
					this.closeCustomKeyboard();
					this.setPin();
				});
	}

	onChange(newVal) {
		if (this.state.element.name === "phone") {
			this._enterPhone(newVal);
		} else {
			if (newVal.length >= 5) {
				newVal = newVal.substring(0, 5);
			}

			this.pin[this.state.element.name] = newVal;

			this._addValidation();
			this.setState({
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
			modelCopy = [];

		let hadPrevValue = Storage.existValue('pin');

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

	onFocus(index, e) {
		setTimeout(function () {
			Keyboard.closeKeyBoard();
		}, 0);
		this.pin.classFocus = setCurrentFocusedInputTo(4, index);

		this.setState({
			element: e.target,
			value: e.target.value,
			keyboardIsVisible: true
		});

		return Keyboard.closeKeyBoard(e);
	}

	static _leave() {
		hashHistory.push('/dialplans/' + Dialplan.getValueByPath("_id"));
	}

	_enterPhone(value) {
		this.setState({
			value: value,
			phoneNumber: value
		});

		if (value) {
			Storage.setValue('phone', value);
		} else {
			Storage.deleteValue('phone');
		}
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

					<button className="m-angle__button btn btn-round btn-sm btn-right btn-round-grey" onClick={Index._leave}>
						<img src={imageLoader(require("images/icons/cross-white-big.png"))} alt="Right"/>
					</button>
				</Angle>
			<AdaptiveFixed>

				<MainScroll class={"l-main-settings" + (this.state.keyboardIsVisible ? " keyboardIsVisible" : "")}>
					<PinForm
						pin={this.pin}
						onFocus={this.onFocus}
						parentScope={this}
					/>
					
					<div className="l-grey">
						<div className="l-grey-header">
							Personal phone number
						</div>
					</div>

					<div className="l-main-content">
						<div className="l-settings-group">
							<input
								type="tel"
								className={"input-custom" + (this.pin.classFocus[3] ? " focus" : "")}
								placeholder="Please enter your telephone number"
								onFocus={this.onFocus.bind(this, 3)}
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
						<Link className="btn btn-block btn-block-lg btn-disconnect" to="/authorize">Disconnect app</Link>
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