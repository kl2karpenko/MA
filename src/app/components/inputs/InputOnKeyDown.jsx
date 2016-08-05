import React, {Component} from 'react';

export default class InputOnKeyDown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value
		};

		this.onChange = this.onChange.bind(this);
	}

	componentWillReceiveProps(t) {
		this.setState({
			value: t.value
		});
	}

	onChange(value) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(value.target ? value.target.value : value);
		}
	}

	componentDidMount(){
		this.refs.nameInput.focus();
	}

	getInputPattern() {
		if (this.props.type === "number") {
			return "[0-9]*";
		} else {
			return "\w*";
		}
	}

	render() {
		return (
			<input
				key="input1"
				ref="nameInput"
				autoFocus={true}
				autoComplete="off"
				pattern={this.getInputPattern()}
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