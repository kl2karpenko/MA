import React, { Component } from 'react';
import { Link } from 'react-router';

import imageLoader from 'lib/imageLoader';

class DialpanPage extends Component {
	constructor(props) {
		super(props);

		this.state = props.dialplan;
	}

	render() {
		return (
			<div className="l-main">
				<div className="l-dialplan">
					<div className="l-dialplan-top">

						{this.state._id} dialplan

					</div>
				</div>
			</div>
		);
	}
}

module.exports = DialpanPage;