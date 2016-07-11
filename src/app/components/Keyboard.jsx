import React, { Component } from 'react';

import imageLoader from 'imageLoader';

export class Keyboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value,
			isValid: this.props.isValid
		};
	}

	/* call on change props in parent scope */
	componentWillReceiveProps(props) {
		this.setState({
			value: props.value,
			isValid: props.isValid
		});
	}

	_setValues(number) {
		let
			newVal = this.state.value,
			onChange = this.props.onChange;

		if (newVal !== undefined) {
			newVal += number;

			this.setState({
				value: newVal
			});

			if (typeof onChange === "function") {
				onChange(newVal);
			}
		}
	}

	_deleteValue() {
		let
			onChange = this.props.onChange,
			newVal = this.state.value.slice(0, -1);

		this.setState({
			value: newVal
		});

		if (typeof onChange === "function") {
			onChange(newVal);
		}
	}
	
	static closeKeyBoard(e) {
		if (process.env.NODE_ENV === 'prod' && cordova && cordova.plugins) {
			cordova.plugins.Keyboard.close();
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			cordova.plugins.Keyboard.isVisible = false;
		}

		if (e) {
			$(e.target).blur();
			document.activeElement.blur();

			e.preventDefault();
		}

		return false;
	}

	static addEventHide() {
		document.addEventListener("showkeyboard", function(){
			Keyboard.closeKeyBoard();
		}, false);
	}

	static removeEventHide() {
		document.removeEventListener("showkeyboard", function(){
			Keyboard.closeKeyBoard();
		}, false);
	}

	render() {
		return (
			<div className="m-keyboard">
				<div className="m-keyboard-digits">
					{[...Array(9)].map((x, i) =>
						<div className="col-xs-5 m-keyboard-digit" key={i}>
							<button className="m-keyboard__key" data-val={i+1} onClick={this._setValues.bind(this, i+1)}>{i + 1}</button>
						</div>
					)}
				</div>
				<div className="m-keyboard-buttons">
					<div className="col-xs-5 m-keyboard-digit">
						<button className="m-keyboard__key buttons" onClick={this._deleteValue.bind(this)}>
							<img className="img-responsive" src={imageLoader(require("images/icons/delete.jpg"))} alt="Delete"/>
						</button>
					</div>
					<div className="col-xs-5 m-keyboard-digit">
						<button className="m-keyboard__key" data-val="0" onClick={this._setValues.bind(this, 0)}>0</button>
					</div>
					<div className="col-xs-5 m-keyboard-digit">
						<div className="m-keyboard__key buttons">
							<button className="btn btn-round btn-sm btn-check"
							        disabled={!this.state.isValid}
							        onClick={this.props.onSubmit}></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export function setCurrentFocusedInputTo(amount, index) {
	let arrayOfFocusedClasses = new Array(amount).fill(false);
	arrayOfFocusedClasses[index] = true;

	return arrayOfFocusedClasses;
}