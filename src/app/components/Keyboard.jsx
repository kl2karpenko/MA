import React, { Component } from 'react';
import config from 'envConfig';

import Tappable from 'react-tappable';

import imageLoader from 'imageLoader';

export class KeyboardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value,
			isValid: props.isValid,
			element: props.element
		};
	}

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

	static keyBoardHide() {
		if (config.process.isBuildApp() && Keyboard) {
			Keyboard.hide();
			setTimeout(() => {
				Keyboard.hide();
			}, 25)
		}
	}

	render() {
		KeyboardComponent.keyBoardHide();

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

export function setCurrentFocusedInputTo(amount, index, element) {
	let arrayOfFocusedClasses = [];
	for (let i = 0; i < amount; i++) {
		arrayOfFocusedClasses[i] = (index === i);
	}

	if (index && element) {
		setTimeout(function () {
			$('.l-adaptive').scrollTop($(element).position().top - 80);
		}, 50)
	}

	return arrayOfFocusedClasses;
}
