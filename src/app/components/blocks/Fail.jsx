import React, { Component } from 'react';

export default class FailBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fail: props.fail,
			isOffline: props.offline
		}
	}

	componentWillReceiveProps(props) {
		this.state = {
			fail: props.fail,
			isOffline: props.offline
		};
	}
	
	_getText() {
		return this.state.isOffline ? "You have gone offline, please check your internet connection" :
			"Server is unavailable!"
	}

	render() {
		return (<div className={"fail" + (this.state.fail ? " visible" : "") + (this.state.isOffline ? " offline visible" : "")}>
				<div className="fail-block">
					<div>{this._getText()}</div>
					<a
						href="#"
						onTouchStart={this.props.onFail}
					  className={"btn btn-danger btn-lg" + (this.state.isOffline  ? " hidden" : "")}
					  style={{marginTop: "15px"}}>Reload</a>
				</div>
			</div>
		);
	}
}