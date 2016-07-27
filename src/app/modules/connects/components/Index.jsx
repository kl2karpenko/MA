import React, { Component } from 'react';

import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

var Swipeable = require('react-swipeable')

var SampleComponent = React.createClass({
	render: function () {
		return (
			<Swipeable
				onSwiping={this.swiping}
				onSwipingUp={this.swipingUp}
				onSwipingRight={this.swipingRight}
				onSwipingDown={this.swipingDown}
				onSwipingLeft={this.swipingLeft}
				onSwipedUp={this.swipedUp}
				onSwipedRight={this.swipedRight}
				onSwipedDown={this.swipedDown}
				onSwipedLeft={this.swipedLeft}
				onSwiped={this.handleSwipeAction}>
				You can be swipe here!
			</Swipeable>
		)
	}
})

export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {		
		return (
		<Swipeable
			onSwipingLeft={() => {
				console.log('onSwipingLeft')
			}}
			onSwipedRight={() => {
				console.log('onSwipedRight')
			}}
		>
			<AdaptiveWrapper>
				{ this.props.children && React.cloneElement(
					this.props.children,
					{
						system: this.props.system
					})
				}
			</AdaptiveWrapper>
		</Swipeable>
		);
	}
}