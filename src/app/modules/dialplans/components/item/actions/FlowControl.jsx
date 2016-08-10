import React, { Component } from 'react';
import Tappable             from 'react-tappable';

import Checkbox             from 'components/inputs/Checkbox.jsx';

/** Import ================================================================== */

export default class FlowControl extends Component {
	constructor(props) {
		super(props);

		this.state = props.options;
	}

	componentWillReceiveProps(props) {
		this.setState(props.options);
	}

	render() {
		return (
			<Tappable
				pressDelay={500}
				component="li"
				className={this.state.className}
				onTap={(e,d,i) => {
					this.props.onChange(e,d,i);
					return true;
				}}
				onTouchEnd={() => {
					return true;
				}}
			>
				<Checkbox
					id={"action_" + this.props.index}
					name="flow_control"
					checked={this.state.is_on}
					onChange={function() { }}
					text={(() => {
					return (
						<div className="l-dialplan-text">
							<div className="l-dialplan-name">{this.state.label || (this.props.in_number + "*" + this.state.short_code)}</div>
						</div>
					);
				})}
				/>
			</Tappable>
		);
	}
}