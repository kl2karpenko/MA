import React, { Component }   from 'react';
import Storage                from "models/Storage";

import AdaptiveWrapper        from 'components/layouts/adaptive/Wrapper.jsx';

/** Import ================================================================== */

export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		$(document).trigger('system:loaded');
		$('.app-loadBlock').removeClass('show');

		if (Storage.getValue("disconnect")) {
			$('.app-loadBlock').addClass('show');
			Storage.deleteValue("disconnect");
		}

		return (
			<AdaptiveWrapper>{this.props.children}</AdaptiveWrapper>
		);
	}
}