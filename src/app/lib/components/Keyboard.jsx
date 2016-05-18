import React from 'react';

function closeKeyboard() {
	if (process.env.NODE_ENV === 'prod' && cordova && cordova.plugins) {
		cordova.plugins.Keyboard.close();
	}
}

export default class Keyboard extends React.Component {
	constructor(props) {
		super(props);

		let options = $.extend({
			element: null,
			onSubmit: null,
			onChange: null,
			multiple: false,
			formName: ''
		}, props.options);

		this.props = options;
	}

	_closeKeyBoardInMobileAndCallChange() {
		setTimeout(closeKeyboard, 0);

		if (typeof this.props.options.onChange === "function") {
			this.props.options.onChange();
		}
	}

	_setOneValue(number) {
		this.props.element.value = number;
		this._closeKeyBoardInMobileAndCallChange();
	}

	_setMultipleValues(number) {
		this.props.element.value += number;
		this._closeKeyBoardInMobileAndCallChange();
	}

	_deleteValue() {
		this.props.element.value = this.props.element.value.slice(1, -1);
		this._closeKeyBoardInMobileAndCallChange();
	}

	render() {
		setTimeout(closeKeyboard, 0);
		let method = this.props.options.multiple ? this._setMultipleValues : this._setOneValue;

		return (
			<div className="m-keyboard">
				<div className="m-keyboard-digits">
					{[...Array(9)].map((x, i) =>
						<div className="col-xs-5 m-keyboard-digit" key={i}>
							<button className="m-keyboard__key" data-val={i+1} onClick={method.bind(this, i+1)}>{i + 1}</button>
						</div>
					)}
				</div>
				<div className="m-keyboard-buttons">
					<div className="col-xs-5 m-keyboard-digit">
						<button className="m-keyboard__key buttons" onClick={this._deleteValue.bind(this)}>
							<span>Delete</span>
						</button>
					</div>
					<div className="col-xs-5 m-keyboard-digit">
						<button className="m-keyboard__key" data-val="0" onClick={method.bind(this, 0)}>0</button>
					</div>
					<div className="col-xs-5 m-keyboard-digit">
						<div className="m-keyboard__key buttons">
							<button className="btn-round btn-sm btn-check"
							        disabled={!this.props.isValid}
							        onClick={this.props.options.onSubmit}></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}