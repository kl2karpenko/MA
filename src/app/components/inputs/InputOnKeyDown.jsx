import React, {Component} from 'react';

let keyCodeMap = {
	8: "backspace",
	9: "tab",
	13: "return",
	16: "shift",
	17: "ctrl",
	18: "alt",
	19: "pausebreak",
	20: "capslock",
	27: "escape",
	32: " ",
	33: "pageup",
	34: "pagedown",
	35: "end",
	36: "home",
	37: "left",
	38: "up",
	39: "right",
	40: "down",
	43: "+",
	44: "printscreen",
	45: "insert",
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
	112: "f1",
	113: "f2",
	114: "f3",
	115: "f4",
	116: "f5",
	117: "f6",
	118: "f7",
	119: "f8",
	120: "f9",
	121: "f10",
	122: "f11",
	123: "f12",
	144: "numlock",
	145: "scrolllock",
	186: ";",
	187: "=",
	188: ",",
	189: "-",
	190: ".",
	191: "/",
	192: "`",
	219: "[",
	220: "\\",
	221: "]",
	222: "'"
};

export default class Pin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value || ""
		};
	}

	componentWillReceiveProps(props) {
		this.onFocus(props.value);
	}

	onFocus(e) {
		if (typeof this.props.onFocus === "function") {
			typeof this.props.onFocus(e);
		}
	}

	getKeyCodeValue(keyCode) {
		return keyCodeMap[keyCode];
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
		if (this.props.type === "number") {
			this.onNumbersAllow(e);
		}

		let
			inputValue = this.state.value,
			keyboardValue = this.getKeyCodeValue(e.keyCode);

		if (keyboardValue === "delete") {
			inputValue = inputValue.slice(0, -1);
		} else {
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
			<input
				autoFocus="true"
				type={this.props.type}
				name={this.props.name}
				value={this.state.value}
				onFocus={this.onFocus}
				onKeyDown={this.onChange}
				className={this.state.className}
			/>
		);
	}
}