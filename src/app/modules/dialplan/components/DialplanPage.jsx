import React, { Component } from 'react';
import { Link } from 'react-router';

import imageLoader from 'lib/imageLoader';

import Session from "core/models/Session";
import Dialplan from "core/models/Dialplan";

import DialplanPersonal from './DialplanPersonal.jsx';
import DialplanCompany from './DialplanCompany.jsx';

class DialplanPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this._loadResourses().then(() => {
			this.setState(Dialplan.Model);
		});
	}

	_loadResourses() {
		return Session
			._getSessionData(Session.Model.user)
			.then(() => {
				let { dialplan } = Session.Model.user;

				return Dialplan.load({
					id: dialplan.id
				});
			});
	}

	render() {
		let Page;

		if (this.state.personal) {
			Page = <DialplanPersonal/>;
		} else {
			Page = <DialplanCompany/>;
		}

		return (
			<div className="l-adaptive-wrapper">
				<div className="l-adaptive l-fixed">
					<div className="m-angle">
						<div className="m-angle-content">
							<div className="m-angle-top">
								<div className="m-angle-name">
									Call Routing
								</div>
								<Link className="m-angle-settings" to="/settings">
									<img src={imageLoader(require("images/icons/nav-list.png"))} alt="Qr background"/>
								</Link>
							</div>

							<div className="m-angle__arrows">
								<Link className="m-angle-arrow __left" to="/dialplan/1e212b17f4c01c3bb31a9b21ff896396">
									<img className="img-responsive" src={imageLoader(require("images/icons/arrow-left.png"))} alt="Left"/>
								</Link>
								<Link className="m-angle-arrow __right" to="/dialplan/1e212b17f4c01c3bb31a9b21ff896396">
									<img className="img-responsive" src={imageLoader(require("images/icons/arrow-right.png"))} alt="Right"/>
								</Link>
							</div>
						</div>
					</div>

					{Page}
				</div>
			</div>
		);
	}
}

module.exports = DialplanPage;