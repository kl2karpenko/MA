import React, { Component } from 'react';

import { setCurrentFocusedInputTo } from 'components/Keyboard.jsx';

export default class Pin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			model: props.model,
			additionalClass: setCurrentFocusedInputTo(5, 0)
		};

		this.onFocus = this.onFocus.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillReceiveProps(s) {
		this.onFocus(s.model.value);
	}

	onFocus(e) {
		console.log('focus =====');

		let value = e;
		if (e.target) {
			value = e.target.value;
		}

		let len = value.length;

		this.setState({
			additionalClass: setCurrentFocusedInputTo(5, (len - 1 < 0 ? len : len - 1), e.target)
		});
	}

	getKeyCodeValue(keyCode, shiftKey) {
		shiftKey = shiftKey || false;
		var value = null;
		if(shiftKey === true) {
			value = this.modifiedByShift()[keyCode];
		} else {
			value = this.keyCodeMap()[keyCode];
		}

		console.log(value);

		return value;
	}

	keyCodeMap() {
		return {
			8:"backspace", 9:"tab", 13:"return", 16:"shift", 17:"ctrl", 18:"alt", 19:"pausebreak", 20:"capslock", 27:"escape", 32:" ", 33:"pageup",
			34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 43:"+", 44:"printscreen", 45:"insert", 46:"delete",
			48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
			61:"=", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
			77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
			96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9",
			106: "*", 107:"+", 109:"-", 110:".", 111: "/",
			112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12",
			144:"numlock", 145:"scrolllock", 186:";", 187:"=", 188:",", 189:"-", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
		};
	}

	modifiedByShift() {
		return {
			192:"~", 48:")", 49:"!", 50:"@", 51:"#", 52:"$", 53:"%", 54:"^", 55:"&", 56:"*", 57:"(", 109:"_", 61:"+",
			219:"{", 221:"}", 220:"|", 59:":", 222:"\"", 188:"<", 189:">", 191:"?",
			96:"insert", 97:"end", 98:"down", 99:"pagedown", 100:"left", 102:"right", 103:"home", 104:"up", 105:"pageup"
		};
	}

	onNumbersAllow(e) {
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40)) {
			// let it happen, don't do anything
			return;
		}

		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	}

	onChange(e) {
		this.onNumbersAllow(e);

		let
			validPinLength = 5,
			inputValue = this.getKeyCodeValue(e.keyCode);

		if (!this.state.model.value) {
			this.state.model.value = inputValue;
		} else {
			this.state.model.value += inputValue;
		}

		this.setState({
			additionalClass: setCurrentFocusedInputTo(5, this.state.model.value.length - 1),
			model: this.state.model
		});

		if (typeof this.props.onChange === "function") {
			typeof this.props.onChange(this.state.model.value);
		}

		if (e.length === validPinLength && typeof this.props.onSubmit === "function") {
			this.props.onSubmit(this.state.model.value).then((newPinModel) => {
				this.setState({
					additionalClass: setCurrentFocusedInputTo(5, 0),
					model: newPinModel.pin
				});
			});
		}
	}

	render() {
		return ( <div className="l-pin-wrapper">
				<div className="l-pin-center">
					<div className="l-pin__name">{this.props.text}</div>
					<div className="l-pin__spaces">
						<div className="row" name="pin" method="POST">
							<div className="col-xs-15 l-pin__space">
								<div className="l-pin__form">
									<input
										autoFocus="true"
										type={this.props.inputType}
										name="pin"
										value={this.state.model.value}
										onFocus={this.onFocus}
										onKeyDown={this.onChange}
										className="l-pin__input"
										maxLength="5"
									/>

									<div className="l-pin__form-read">
										<div className="row">
											{[...Array(5)].map((x, i) =>
												<div className="col-xs-3 l-pin__space" key={i}>
													<div>
														<input
															readOnly="true"
															value={this.state.model.value && this.state.model.value[i]}
															type={this.props.inputType}
															className={"l-pin__pinLetters" + (this.state.additionalClass[i] ? " focus" : "")}
														/>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}