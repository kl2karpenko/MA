import React, {Component} from 'react';
import Tappable from 'react-tappable';

let keyCodeMap = {
	8: "backspace",
	32: " ",
	46: "delete",
	48: "0",
	49: "1",
	50: "2",
	51: "3",
	52: "4",
	53: "5",
	54: "6",
	55: "7",
	56: "8",
	57: "9",
	59: ";",
	61: "=",
	65: "a",
	66: "b",
	67: "c",
	68: "d",
	69: "e",
	70: "f",
	71: "g",
	72: "h",
	73: "i",
	74: "j",
	75: "k",
	76: "l",
	77: "m",
	78: "n",
	79: "o",
	80: "p",
	81: "q",
	82: "r",
	83: "s",
	84: "t",
	85: "u",
	86: "v",
	87: "w",
	88: "x",
	89: "y",
	90: "z",
	96: "0",
	97: "1",
	98: "2",
	99: "3",
	100: "4",
	101: "5",
	102: "6",
	103: "7",
	104: "8",
	105: "9",
	106: "*",
	107: "+",
	109: "-",
	110: ".",
	111: "/",
	189: "-",
	190: "."
};

export default class Pin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value || ""
		};

		this.onChange = this.onChange.bind(this);
	}

	componentWillReceiveProps(props) {
		// this.onFocus(props.value);
	}

	getKeyCodeValue(keyCode) {
		return keyCodeMap[keyCode] || false;
	}

	onNumbersAllow(e) {
		if ($.inArray(e.keyCode, [46, 8, 110, 190]) !== -1 ) {
			return;
		}

		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	}

	onChange(e) {
		if (this.props.type === "number") {
			this.onNumbersAllow(e);
		}

		let
			inputValue = this.state.value,
			keyboardValue = this.getKeyCodeValue(e.keyCode);

		if (keyboardValue === "delete" || keyboardValue === "backspace") {
			inputValue = inputValue.slice(0, -1);
		} else if (keyboardValue) {
			inputValue += keyboardValue;
		}

		this.setState({
			value: inputValue
		});

		if (typeof this.props.onChange === "function") {
			typeof this.props.onChange(inputValue, e);
		}
	}

	render() {
		return (
			<Tappable
				component="input"
				autoFocus="true"
				type={this.props.type}
				placeholder={this.props.placeholder}
				name={this.props.name}
				value={this.state.value}
				onKeyDown={this.onChange}
				className={this.props.className}
			/>
		);
	}
}