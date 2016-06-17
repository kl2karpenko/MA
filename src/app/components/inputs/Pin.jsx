import React, { Component } from 'react';

import { setCurrentFocusedInputTo } from 'components/Keyboard.jsx';

export default class Pin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			model: props.model,
			additionalClass: setCurrentFocusedInputTo(5, 0)
		};

		this.onFocus = this.onFocus.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillReceiveProps(s) {
		this.onFocus(s.model.pin);
	}

	onFocus(e) {
		let value = e;
		if (e.target) {
			value = e.target.value
		}

		this.setState({
			additionalClass: setCurrentFocusedInputTo(5, value.length - 1 < 0 ? value.length : value.length - 1)
		});
	}

	onChange(inputValue) {
		let
			validPinLength = 5;

		if (inputValue.target) {
			inputValue = inputValue.target.value;
		}

		this.state.model.pin = inputValue;

		this.setState({
			additionalClass: setCurrentFocusedInputTo(5, inputValue.length - 1),
			model: this.state.model
		});

		if (typeof this.props.onChange === "function") {
			typeof this.props.onChange(inputValue);
		}

		if (inputValue.length === validPinLength && typeof this.props.onSubmit === "function") {
			this.props.onSubmit().done((newPinModel) => {
				this.setState({
					additionalClass: setCurrentFocusedInputTo(5, 0),
					model: newPinModel
				});
			});
		}
	}

	render() {
		return ( <div className="l-pin-wrapper">
				<div className="l-pin-center">
					<div className="l-pin__name">{this.props.text}</div>
					<div className="l-pin__spaces">
						<form name={this.props.form} className="row" name="pin" method="POST">
							<div className="col-xs-15 l-pin__space">
								<div className="l-pin__form">
									<input type="text"
									       autoFocus="true"
									       type={this.props.inputType}
									       name="pin"
									       required
									       value={this.state.model.pin}
									       onFocus={this.onFocus}
									       onChange={this.onChange}
									       className="l-pin__input"
									       maxLength="5"
									/>

									<div className="l-pin__form-read">
										<div className="row">
											{[...Array(5)].map((x, i) =>
												<div className="col-xs-3 l-pin__space" key={i}>
													<div>
														<input readOnly="true" value={this.state.model.pin[i]} type={this.props.inputType}
														       className={"l-pin__pinLetters" + (this.state.additionalClass[i] ? " focus" : "")}/>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}