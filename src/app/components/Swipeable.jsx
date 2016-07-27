import React, { Component } from 'react';

export class SwipeableComponent extends Component {
	constructor(props) {
		super(props);

		console.log('Swipeable');
	}

	render() {
		return <ReactSwipe>
			{this.props.children}
		</ReactSwipe>
	}
}