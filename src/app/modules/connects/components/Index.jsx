import React, { Component } from 'react';

import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

var Swipeable = require('react-swipeable')

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