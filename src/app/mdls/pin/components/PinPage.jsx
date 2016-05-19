import React from 'react';
import schema from 'schema';
import { hashHistory } from 'react-router'

import Keyboard from 'components/Keyboard.jsx';
import User from '../../core/models/User';

function findNextTabStop(el) {
	var universe = document.querySelectorAll('form[name=pinCheck] input');
	var list = Array.prototype.filter.call(universe, function(item) {return item.tabIndex >= "0"});
	var index = list.indexOf(el);
	return list[index + 1] || list[0];
}

function closeKeyboard() {
	if (process.env.NODE_ENV === 'prod' && cordova && cordova.plugins) {
		cordova.plugins.Keyboard.close();
	}
}

class PinPage extends React.Component {
	constructor(props) {
		super(props);

		this.init();
		var user = new User();
		console.log(user)
	}

	init() {
		this.state = {
			isValid: false,
			element: ""
		};

		this.keyBoardOptions = {
			onSubmit: this._checkPinCode.bind(this),
			multiple: false,
			onChange: this._setNextInput.bind(this)
		};

		this.formName = 'pinCheck';
	}

	_getPinCodeValue() {
		var values = $("[name='" + this.formName + "']").serializeArray();

		return values.reduce((previousValue, currentValue) => {
			if (previousValue.value) {
				return previousValue.value + currentValue.value;
			} else {
				return previousValue + currentValue.value;
			}
		});
	}

	_setIfValidPinCodeState() {
		let pinCode = this._getPinCodeValue();

		this.setState({
			isValid: pinCode.length === 5
		});
	}

	_checkPinCode() {
		schema.pin
			.create({
				'pin': this._getPinCodeValue()
			})
			.then(() => {
				if(res) {
					hashHistory.push('/connect/main');
				}
			});
	}

	_setFocusedInput(e) {
		this.setState({
			element: e.target
		});

		setTimeout(closeKeyboard, 0);
	}

	_setNextInput() {
		this._setIfValidPinCodeState();

		findNextTabStop(this.state.element).focus();
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="l-pin">
					<div className="l-pin-wrapper">
						<div className="l-pin-center">
							<div className="l-pin__name">Enter the code</div>
							<div className="l-pin__spaces">
								<form name={this.formName} className="row" method="POST">
									{[...Array(5)].map((x, i) =>
										<div className="col-xs-3 l-pin__space" key={i}>
											<div>
												<input autoFocus={i===0} type="password" name="pin[]"
												       onFocus={this._setFocusedInput.bind(this)}
												       className="l-pin__pinLetters"/>
											</div>
										</div>
									)}
								</form>
							</div>
						</div>
					</div>
					<Keyboard options={this.keyBoardOptions}
					          element={this.state.element}
										isValid={this.state.isValid}/>
				</div>
			</div>
		);
	}
}

module.exports = PinPage;