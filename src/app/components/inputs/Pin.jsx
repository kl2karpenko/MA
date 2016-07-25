import React, { Component } from 'react';

import { setCurrentFocusedInputTo } from 'components/Keyboard.jsx';
import InputOnKeyDown from './InputOnKeyDown.jsx';

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
		this.onFocus(s.model.value);
	}

	onFocus(e) {
		console.log('onFocus', e);

		let value = e;
		if (e.target) {
			value = e.target.value;
		}

		let len = value.length;

		this.setState({
			additionalClass: setCurrentFocusedInputTo(5, (len - 1 < 0 ? len : len - 1), e.target)
		});
	}

	onChange(inputValue) {
		console.log('onChange to: ', inputValue);
		let
			validPinLength = 5;

		this.state.model.value = inputValue;

		this.setState({
			additionalClass: setCurrentFocusedInputTo(5, inputValue.length - 1),
			model: this.state.model
		});

		if (typeof this.props.onChange === "function") {
			typeof this.props.onChange(inputValue);
		}

		if (inputValue.length === validPinLength && typeof this.props.onSubmit === "function") {
			this.props.onSubmit().then((newPinModel) => {
				this.setState({
					additionalClass: setCurrentFocusedInputTo(5, 0),
					model: newPinModel.pin
				});
			});
		}
	}

	render() {
		return ( <div className="l-pin-wrapper">
				<div className="l-pin-center">
					<div className="l-pin__name">{this.props.text}</div>
					<div className="l-pin__spaces">
						<div className="row" name="pin" method="POST">
							<div className="col-xs-15 l-pin__space">
								<div className="l-pin__form">
									<InputOnKeyDown
										type={this.props.inputType}
										name="pin"
										value={this.state.model.value}
										onFocus={this.onFocus}
										onChange={this.onChange}
										className="l-pin__input"
									/>

									<div className="l-pin__form-read">
										<div className="row">
											{[...Array(5)].map((x, i) =>
												<div className="col-xs-3 l-pin__space" key={i}>
													<div>
														<input
															readOnly="true"
															value={this.state.model.value && this.state.model.value[i]}
															type={this.props.inputType}
															className={"l-pin__pinLetters" + (this.state.additionalClass[i] ? " focus" : "")}
														/>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}