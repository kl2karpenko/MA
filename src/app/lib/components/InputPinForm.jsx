import React, { Component } from 'react';

import { Keyboard, setCurrentFocusedInputTo } from 'components/Keyboard.jsx';

export default class InputPinForm extends Component {
	constructor(props) {
		super(props);
		console.log(props, this.props)

		this.parent = this.props.getParentContext();
		this.keyboard = this.props.options.keyBoardOptions;

		this.state = {
			additionalClass: setCurrentFocusedInputTo(3, 0)
		};

		if (this.keyboard) {
			this.keyboard.onChange = this.onChangePinValue.bind(this.parent, this);
			this.keyboard.onSubmit = props.options.onSubmit.bind(this.parent);
		}
	}

	onFocusMainPin(e) {
		setCurrentFocusedInputTo(3, e.target.value.length);

		// close keyboard if have our custom keyboard
		if (this.pinOptions.keyBoardOptions) {
			return Keyboard.closeKeyBoard(e);
		}
	}

	_setValidValueOfPin(inputValue) {
		if (inputValue.target) {
			inputValue = inputValue.target.value;
		}

		if (!inputValue) {
			this.setState({
				pinValue: ""
			});
		} else if (inputValue.length >= 5) {
			inputValue = inputValue.substring(0, 5);
			this.setState({
				pinValue: inputValue
			});
		}

		return inputValue;
	}

	_changePinStateValues(inputValue, isValidPin) {
		this.setState({
			pinValue: inputValue,
			isValid: isValidPin
		});
	}

	_checkIfValidPinCode(isValidPin, value) {
		if (isValidPin && typeof this.props.options.onSubmit === "function") {
			this.props.options.onSubmit(value).then(() => {
				this.setState({
					additionalClass: setCurrentFocusedInputTo(3, 0)
				});
			});
		}
	}

	_changeValueFromKeyboard(inputValue) {
		if (this.keyboard) {
			this.keyboard.value = inputValue;
		}
	}

	onChangePinValue(context, inputValue) {
		let
			validPinLength = 5,
			pinValueLen = 0;

		inputValue = context._setValidValueOfPin.bind(this)(inputValue);

		pinValueLen = inputValue.length;

		if (typeof context.props.options.onChange === "function") {
			context.props.options.onChange(inputValue);
		}

		context.setState({
			additionalClass: setCurrentFocusedInputTo(3, pinValueLen - 1)
		});

		context._changePinStateValues.bind(this)(inputValue, pinValueLen === validPinLength);
		context._changeValueFromKeyboard.bind(context)(inputValue);
		context._checkIfValidPinCode.bind(context)(pinValueLen === validPinLength, inputValue);
	}

	render() {
		return ( <div className="l-pin">
			<div className="l-pin-wrapper">
				<div className="l-pin-center">
					<div className="l-pin__name">{this.props.options.name}</div>
					<div className="l-pin__spaces">
						<form name={this.props.options.formName} className="row" method="POST">
							<div className="col-xs-15 l-pin__space">
								<div className="l-pin__form">
									<input type="text"
									       autoFocus="true"
									       type={this.props.options.inputType}
									       name="pin"
									       required
									       value={this.parent.state.pinValue}
									       onFocus={this.onFocusMainPin.bind(this.parent)}
									       onChange={this.onChangePinValue.bind(this.parent, this)}
									       className="l-pin__input"
									       maxLength="5"
									/>

									<div className="l-pin__form-read">
										<div className="row">
											{[...Array(5)].map((x, i) =>
													<div className="col-xs-3 l-pin__space" key={i}>
														<div>
															<input readOnly="true" value={this.parent.state.pinValue[i]} type={this.props.options.inputType}
															       className={"l-pin__pinLetters" + (this.state.additionalClass[i] ? " focus" : "")}/>
														</div>
													</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			{(() => {
				let options = this.keyboard;

				if(options) {
					return <Keyboard
						options={options}
						getParentContext={() => {
		          return this.parent;
		        }}
					/>
				}
			})()}
		</div>
		);
	}
}