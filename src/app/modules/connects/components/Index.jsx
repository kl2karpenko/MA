import React, { Component } from 'react';

import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		$(document).trigger('system:loaded');
		
		return (
			<AdaptiveWrapper>
				{ this.props.children }
			</AdaptiveWrapper>
		);
	}
}