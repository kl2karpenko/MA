import React, { Component } from 'react';
import Tappable from 'react-tappable';

import Checkbox from 'components/inputs/Checkbox.jsx';

export default class FlowControl extends Component {
	constructor(props) {
		super(props);

		this.state = props.options;
	}

	render() {
		return (
			<Tappable
				pressDelay={500}
				component="li"
				className={this.state.className}
				onTap={this.props.onChange}
			>
					<Checkbox
						id={"action_" + this.props.index}
						name="flow_control"
						value={this.state.action_id}
						checked={this.state.value.is_on}
						onChange={function() { }}
						text={(() => {
						return (
							<div className="l-dialplan-text">
								<div className="l-dialplan-name">{this.state.value.label || (this.props.in_number + "*" + this.state.value.short_code)}</div>
							</div>
						);
					})}
					/>
			</Tappable>
		);
	}
}