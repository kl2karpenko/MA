import React, { Component }     from 'react';
import config                   from 'envConfig';

import InputOnKeyDown           from 'components/inputs/InputOnKeyDown.jsx';
import { $t }                   from 'lib/locale';

/** Import ================================================================== */

export default class SearchTop extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ""
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(inputValue) {
		if (inputValue.target) {
			inputValue = inputValue.target.value;
		}

		this.setState({
			value: inputValue
		});

		if (typeof this.props.onChange === "function") {
			this.props.onChange(inputValue);
		}
	}

	render() {
		let InputRender = <InputOnKeyDown
			type="text"
			onChange={this.onChange}
			value={this.state.value}
			name="contacts"
			className="input-custom input-search"
			placeholder={$t("contacts.search.placeholder")}
		/>;

		if (!config.process.isIOS()) {
			InputRender = <input
				autoFocus="true"
				type="text"
				onChange={this.onChange}
				value={this.state.value}
				name="contacts"
				className="input-custom input-search"
				placeholder={$t("contacts.search.placeholder")}
			/>;
		}

		return InputRender;
	}
}