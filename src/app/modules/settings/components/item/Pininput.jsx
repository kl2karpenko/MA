import React, {Component} from 'react';

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);

		this.state = {
			value: props.value
		}
	}

	onFocus(e) {
		console.log('onFocus')
		if (typeof this.props.onFocus === "function") {
			this.props.onFocus(e);
		}
	}

	onChange(e) {
		console.log('onChange', e.target.value)
		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		}

		this.setState({
			value: e.target.value
		})
	}

	render() {
		return (
				<input type="number"
		       autoFocus={this.props.index === 0}
		       onFocus={this.onFocus}
		       onChange={this.onChange}
		       className={"input-custom" + (this.props.focus ? " focus" : "")}
		       placeholder={this.props.placeholder}
		       name={this.props.name}
		       value={this.state.value}
				/>
		);
	}
}