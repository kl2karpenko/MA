import React, {Component} from 'react';
import { Link } from 'react-router';

import imageLoader from 'lib/imageLoader';
import schema from 'schema';

import { Keyboard, setCurrentFocusedInputTo } from 'components/Keyboard.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.placeholderText = [ "Enter current", "Enter new pincode" , "Reenter new pincode"];

		this.state = {
			isUsingPin: false,
			isValid: false,
			element: "",
			classFocus: setCurrentFocusedInputTo(3,0),
			keyBoardOptions: {
				value: "",
				onChange: this._onChangeInput.bind(this)
			}
		};
	}

	_onFocusInput(index, e) {
		let
			element = e.target,
			value = element.value;

		this.setState({
			element: element,
			classFocus: setCurrentFocusedInputTo(3, index),
			keyBoardOptions: {
				value: value,
				onChange: this._onChangeInput.bind(this)
			}
		});

		return Keyboard.closeKeyBoard(e);
	}

	_onChangeInput(newVal) {
		newVal = Index._checkIfValidPinCode(newVal);

		this.state.element.value = newVal;

		this.setState({
			keyBoardOptions: {
				value: newVal,
				onChange: this._onChangeInput.bind(this)
			}
		});
	}

	_toggleUsingPin(e) {
		let isPinOn =  e.target.checked;

		this.setState({
			isUsingPin: isPinOn
		});

		if (isPinOn) {
			schema.pin.read().then((res) => {
				console.log(res.pin);

				this.setState({
					classFocus: setCurrentFocusedInputTo(3, 0),
					element: document.querySelector('form[name=pinChange] input:first-child')
				});
			});
		}
	}

	static _checkIfValidPinCode(pinValue) {
		if (pinValue.length >= 5) {
			pinValue = pinValue.substring(0, 5);
		}

		return pinValue;
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
								<label htmlFor="is_have_pin" className="checkbox-block m-label clearfix">
									<div className="l-grey-header pull-left">
										Password at login
									</div>
									<input type="checkbox" name="is_have_pin" id="is_have_pin" checked={this.state.isUsingPin}
									       onChange={this._toggleUsingPin.bind(this)}/>
									<div className="checkbox-button pull-right"></div>
								</label>
							</div>

							<div className={"l-settings l-main-content" + (!this.state.isUsingPin ? " disabled" : "")}>
								<form action="" name="pinChange">
									{[...Array(3)].map((x, i) =>
										<div className="l-settings-group" key={i}>
											<input type="number" autoFocus={i === 0}
											       pattern="\d{5}"
											       onFocus={this._onFocusInput.bind(this, i)}
											       className={"input-custom" + (this.state.classFocus[i] ? " focus" : "")}
											       placeholder={this.placeholderText[i]}
														 required/>
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


				<div className={"l-keyboard l-keyboard-fixed" + (this.state.classFocus.some((el) => { return el; }) ? ' visible' : "") }>
					<Keyboard
						options={this.state.keyBoardOptions}
						getParentContext={() => {
		          return this;
		        }}
					/>
				</div>
			</div>
		);
	}
}