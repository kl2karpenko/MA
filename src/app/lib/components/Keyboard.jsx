import React from 'react';

export default class Keyboard extends React.Component {
	constructor(props) {
		super($.extend({
			onSubmit: null,
			onChange: null,
			isValid: false,
			multiple: false,
			formName: ''
		}, props.options));

		this.parent = props.getParentContext();
	}

	_setOneValue(number) {
		let context = this.parent;

		console.log(context.state.element)

		if (context.state.element) {
			context.state.element.value = number;

			if (typeof this.props.options.onChange === "function") {
				this.props.options.onChange( this, $(context.state.element).data('index'), number );
			}
		}
	}

	_setMultipleValues(number) {
		let context = this.parent;
		
		context.state.element.value += number;
	}

	_deleteValue() {
		let context = this.parent;

		context.state.element.value = context.state.element.value.slice(1, -1);
	}

	render() {
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
							        disabled={!(this.parent).state.isValid}
							        onClick={this.props.options.onSubmit}></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}