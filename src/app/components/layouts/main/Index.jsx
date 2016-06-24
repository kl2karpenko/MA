import React, { Component } from 'react';

export default class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={"l-main" + (this.props.class ? " " + this.props.class : "")}>
				{(() => {
					if(this.props.center) {
						return <div className="l-main-center">{this.props.center}</div>
					}
				})()}
				{this.props.children}
			</div>
		);
	}
}