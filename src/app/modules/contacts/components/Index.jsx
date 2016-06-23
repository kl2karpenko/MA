import React, { Component } from 'react';
import { Link } from 'react-router';

import imageLoader from 'imageLoader';

export default class ContactPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="l-adaptive-wrapper">
				<div className="l-adaptive l-fixed">
					<div className="m-angle">
						<div className="m-angle-wrapper">
							<div className="m-angle-content">
								<div className="m-angle-top">
									<div className="m-angle-name">
										Forward to:
									</div>
								</div>

								<div className="m-angle-info">
									<Link to="/contacts/mobile">Mobile</Link>
									<Link to="/contacts/extensions">Extensions</Link>
								</div>
							</div>

							<button className="m-angle__button btn btn-round btn-sm btn-right">
								<img src={imageLoader(require("images/icons/search.png"))} alt="Right"/>
							</button>
						</div>
					</div>
					<div className="l-main">
						<div className="l-main-scroll">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		);
	}
}