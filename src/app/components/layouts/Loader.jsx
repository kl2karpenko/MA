import React, { Component } from 'react';

export default class Loader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: props.show
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			show: props.show
		});
	}

	render() {
		return <div className={"app-loadBlock" + (this.state.show ? " show" : "")}></div>;
	}
}