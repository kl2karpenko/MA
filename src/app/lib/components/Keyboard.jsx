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

		this.state = {
			value: props.options.value
		};

		this.parent = props.getParentContext();
		console.log(this.parent);
	}

	_setValues(number) {

		if (this.state.value !== undefined) {

			console.log(this.state.value + number);
			this.setState({
				value: this.state.value + number
			});

			if (typeof this.props.options.onChange === "function") {
				this.props.options.onChange(this.state.value);
			}
		}
	}

	_deleteValue() {
		// let context = this.parent;
		// context.state.pinValue = context.state.pinValue.slice(0, -1);

		this.setState({
			value: this.state.value.slice(0, -1)
		});

		if (typeof this.props.options.onChange === "function") {
			this.props.options.onChange( this.state.value );
		}
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
							<span>Delete</span>
						</button>
					</div>
					<div className="col-xs-5 m-keyboard-digit">
						<button className="m-keyboard__key" data-val="0" onClick={this._setValues.bind(this, 0)}>0</button>
					</div>
					<div className="col-xs-5 m-keyboard-digit">
						<div className="m-keyboard__key buttons">
							<button className="btn btn-round btn-sm btn-check"
							        disabled={!(this.parent).state.isValid}
							        onClick={this.props.options.onSubmit}></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}