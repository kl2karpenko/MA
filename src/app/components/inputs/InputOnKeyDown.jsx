import React, {Component} from 'react';
import Tappable from 'react-tappable';

import _ from 'underscore';

export default class Pin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ""
		};

		this.inputValue = "";

		this.onChange = this.onChange.bind(this);
	}

	static onNumbersAllow(val) {
		let arrayOfNumbers = _.map(_.range(1, 10), String);

		return arrayOfNumbers.indexOf(val) !== -1;
	}

	onChange(value) {
		if (value.target) {
			value = value.target.value;
		}

		if (this.props.type === "number") {
			this.onNumbersAllow(value);
		}

		this.setState({
			value: value
		});

		console.log('onChange this.inputValue: ', value);

		if (typeof this.props.onChange === "function") {
			typeof this.props.onChange(value);
		}
	}

	componentDidMount(){
		this.refs.nameInput.focus();
	}

	render() {
		return (
			<input
				key="input1"
				ref="nameInput"
				autoFocus="true"
				autoComplete="off"
				type={this.props.type}
				value={this.state.value}
				placeholder={this.props.placeholder}
				name={this.props.name}
				onChange={this.onChange}
				className={this.props.className}
			/>
		);
	}
}