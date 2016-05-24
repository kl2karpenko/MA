import React, { Component } from 'react';
import { Link } from 'react-router';

import imageLoader from 'lib/imageLoader';

class DialpanPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="l-main">
				<Link activeClassName="active" className="m-angle__button btn-round btn-sm btn-settings" to="/connect/qr">
					<img src={imageLoader(require("images/icons/list.png"))} alt="Right"/>
				</Link>

				<div className="l-dialplan">
					<div className="l-dialplan-top">

					</div>
				</div>
			</div>
		);
	}
}

module.exports = DialpanPage;