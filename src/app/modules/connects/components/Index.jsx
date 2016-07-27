import React, { Component } from 'react';

import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';
let Swiper = require('react-swiper');

React.initializeTouchEvents(true);

export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// TODO: swipe events didnt work
		return (
		<Swiper
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
		</Swiper>
		);
	}
}