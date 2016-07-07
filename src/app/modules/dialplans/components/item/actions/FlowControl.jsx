import React, { Component } from 'react';

import Checkbox from 'components/inputs/Checkbox.jsx';

export default class FlowControl extends Component {
	constructor(props) {
		super(props);

		this.state = props.options;
	}

	render() {
		return (
			<li className={this.state.className}>
				<Checkbox
					id={"action_" + this.props.index}
					name="flow_control"
					value={this.state.action_id}
					checked={this.state.value.is_on}
					text={(() => {
						return (
							<div className="l-dialplan-text">
								<div className="l-dialplan-name">{this.state.value.label || (this.props.in_number + "*" + this.state.value.short_code)}</div>
							</div>
						);
					})}
					onChange={this.props.onChange}
					/>
			</li>
		);
	}
}