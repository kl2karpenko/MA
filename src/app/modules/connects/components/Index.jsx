import React, { Component }   from 'react';

import AdaptiveWrapper        from 'components/layouts/adaptive/Wrapper.jsx';

/** Import ================================================================== */

export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		$(document).trigger('system:loaded');
		$('.app-loadBlock').removeClass('show');

		return (
			<AdaptiveWrapper>{this.props.children}</AdaptiveWrapper>
		);
	}
}