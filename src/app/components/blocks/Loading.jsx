import React, { Component } from 'react';

export default class LoadingBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: props.show
		}
	}

	componentWillReceiveProps(props) {
		this.state = {
			show: props.show
		};
	}

	render() {
		return (
			<div className={"app-loader" + (this.state.show ? " loading" : "")}>
				<div>
					{[...Array(5)].map((x, i) =>
						<span key={i}></span>
					)}
				</div>
			</div>
		);
	}
}