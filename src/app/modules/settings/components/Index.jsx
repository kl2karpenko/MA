import React, {Component} from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'lib/imageLoader';

import Session from "models/Session";

export default class Index extends Component {
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
										Settings
									</div>
								</div>
							</div>

							<Link activeClassName="active" className="m-angle__button btn-round btn-sm btn-list btn-round-grey" to="/dialplans/list">
								<img src={imageLoader(require("images/icons/cross-white-big.png"))} alt="Right"/>
							</Link>
						</div>
					</div>

					<div className="l-main l-main-settings">
						<div className="l-grey l-grey-md">
							<div className="l-grey-header">
								Password at login
							</div>
						</div>
					</div>

				</div>
			</div>
		);
	}
}