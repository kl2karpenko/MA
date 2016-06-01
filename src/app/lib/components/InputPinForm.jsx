import React, { Component } from 'react';

import Keyboard from 'components/Keyboard.jsx';

function closeKeyboard() {
	if (process.env.NODE_ENV === 'prod' && cordova && cordova.plugins) {
		cordova.plugins.Keyboard.close();
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

		cordova.plugins.Keyboard.isVisible = false;
	}
}

function findNextTabStop(el) {
	var universe = document.querySelectorAll('form[name=' + this.props.options.formName + '] input');
	var list = Array.prototype.filter.call(universe, function(item) {return item.tabIndex >= "0"});
	var index = list.indexOf(el);
	console.log(list[index+1], 'element to focus on');

	return list[index + 1] || list[0];
}

export default class InputPinForm extends Component {
	constructor(props) {
		super(props);

		this.parent = this.props.getParentContext();

		this.state = {
			additionalClass: [!!this.props.keyBoardOptions, false, false, false, false]
		};

		if (this.props.keyBoardOptions) {
			this.props.keyBoardOptions.onChange = this.onChangePinValue.bind(this.parent);
		}
	}

	componentWillMount() {
		if (!this.parent.state.element) {
			this.parent.setState({
				element: document.querySelectorAll('form[name=' + this.props.options.formName + '] input')[0]
			});
		}
	}

	onChangePinValue(context, indexOfInput, inputValue) {
		console.log('onChangePinValue', inputValue);

		let pinValue = this.state.pinValue;

		if (inputValue.target) {
			inputValue = inputValue.target.value;

			if (inputValue.length > 1) {
				this.state.element.value = inputValue = inputValue[inputValue.length - 1];
			}
		}

		if (!inputValue) {
			return false;
		}

		pinValue[indexOfInput] = inputValue;

		this.setState({
			pinValue: pinValue,
			isValid: pinValue.join("").length === 5
		});

		findNextTabStop.bind(context)(this.state.element).focus();
	}

	_setFocusedStyles(index) {
		let additionalClass = [false, false, false, false, false];

		additionalClass[index] = true;

		this.setState({
			additionalClass: additionalClass
		});
	}

	_setFocusedInput(context, index, e) {
		if (this.keyBoardOptions) {
			closeKeyboard();
			context._setFocusedStyles(index);
		}

		this.setState({
			element: e.target
		});

		if (this.keyBoardOptions) {
			$(e.target).blur();
			document.activeElement.blur();
			e.preventDefault();
			return false;
		}
	}

	render() {
		return ( <div className="l-pin">
			<div className="l-pin-wrapper">
				<div className="l-pin-center">
					<div className="l-pin__name">{this.props.options.name}</div>
					<div className="l-pin__spaces">
						<form name={this.props.options.formName} className="row" method="POST">
							{[...Array(5)].map((x, i) =>
								<div className="col-xs-3 l-pin__space" key={i}>
									<div>
										<input data-index={i} autoFocus={i===0} type={this.props.options.inputType} name="pin[]"
										       onFocus={this._setFocusedInput.bind(this.parent, this, i)}
										       required
										       onChange={this.onChangePinValue.bind(this.parent, this, i)}
										       className={"l-pin__pinLetters" + (this.state.additionalClass[i] ? " focusedInput" : "")}/>
									</div>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>

			{(() => {
				let options = this.props.keyBoardOptions;

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