import React, { Component } from 'react';

export class SwipeableComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <ReactSwipe>
			{this.props.children}
		</ReactSwipe>
	}
}