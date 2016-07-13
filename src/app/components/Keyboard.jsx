import React, { Component } from 'react';
import Tappable from 'react-tappable';

import imageLoader from 'imageLoader';

export class Keyboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value,
			isValid: props.isValid,
			element: props.element
		};
	}

	/* call on change props in parent scope */
	componentWillReceiveProps(props) {
		this.setState({
			value: props.value,
			isValid: props.isValid,
			element: props.element
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
			console.log('show');
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
							<Tappable
								pressDelay={500}
								component="button"
								className="m-keyboard__key"
								data-val={i+1}
								onTap={this._setValues.bind(this, i+1)}
							>{i + 1}</Tappable>
						</div>
					)}
				</div>
				<div className="m-keyboard-buttons">
					<div className="col-xs-5 m-keyboard-digit">
						<Tappable
							pressDelay={500}
							component="button"
							className="m-keyboard__key buttons"
							onTap={this._deleteValue.bind(this)}
						>
							<img className="img-responsive" src={imageLoader(require("images/icons/delete.jpg"))} alt="Delete"/>
						</Tappable>
					</div>
					<div className="col-xs-5 m-keyboard-digit">
						<Tappable
							pressDelay={500}
							component="button"
							className="m-keyboard__key"
							data-val="0"
							onTap={this._setValues.bind(this, 0)}
						>
							0
						</Tappable>
					</div>
					<div className="col-xs-5 m-keyboard-digit">
						<div className="m-keyboard__key buttons">
							<Tappable
								pressDelay={500}
								component="button"
								className="btn btn-round btn-sm btn-check"
								disabled={!this.state.isValid}
								onTap={this.props.onSubmit}
							/>
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