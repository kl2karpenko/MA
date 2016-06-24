import React, { Component } from 'react';

import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {		
		return (
			<AdaptiveWrapper>
				{this.props.children}
			</AdaptiveWrapper>
		);
	}
}