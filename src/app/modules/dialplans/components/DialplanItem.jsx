import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'lib/imageLoader';

import Dialplans from "models/Dialplans";
import Dialplan from "models/Dialplan";

import PersonalDialplan from './items/PersonalDialplan.jsx';
import CompanyDialplan from './items/PersonalDialplan.jsx';

class DialplanItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Dialplans: Dialplans,
			Dialplan: Dialplan.Model,
			current: "",
			previous: "",
			next: ""
		};
	}

	componentWillMount() {
		this._changePreviousAndNextState();
	}

	_changePreviousAndNextState() {
		this.setState({
			previous: Dialplans.getPreviousUrl(),
			next: Dialplans.getNextUrl()
		});
	}

	changePageAndStates() {
		let currentDialplan = Dialplans.getCurrent();

		this._changePreviousAndNextState();
		this._setCurrentDialplan(currentDialplan);
		hashHistory.push(Dialplans.getUrl(currentDialplan));
	}

	_setCurrentDialplan(props) {
		Dialplan.assignAttributes(props);
		
		this.setState({
			Dialplan: Dialplan.Model
		});
	}

	renderDialplan(dialplan) {
		Dialplans.setCurrent(Dialplans['get' + dialplan]());
		this.changePageAndStates();
	}

	static _getButtonClass(url) {
		return !url ? ' disabled' : '';
	}

	render() {
		// console.log('render item', Dialplans, this.state.previous, this.state.next)
		let Page;

		if (true) {
			Page = <PersonalDialplan dialplan={this.state.Dialplan}/>;
		} else {
			Page = <CompanyDialplan dialplan={this.state.Dialplan}/>;
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
								<button className={"m-angle-arrow __left" + DialplanItem._getButtonClass(this.state.previous)} onClick={this.renderDialplan.bind(this, 'Previous')}>
									<img className="img-responsive" src={imageLoader(require("images/icons/arrow-left.png"))} alt="Left"/>
								</button>
								<button className={"m-angle-arrow __right" + DialplanItem._getButtonClass(this.state.next)} onClick={this.renderDialplan.bind(this, 'Next')}>
									<img className="img-responsive" src={imageLoader(require("images/icons/arrow-right.png"))} alt="Left"/>
								</button>
							</div>
						</div>

						<div className="m-angle-rotated">
							<Link activeClassName="active" className="m-angle__button btn-round btn-sm btn-settings" to="/dialplans/list">
								<img src={imageLoader(require("images/icons/list.png"))} alt="Right"/>
							</Link>
						</div>
					</div>

					{Page}
				</div>
			</div>
		);
	}
}

module.exports = DialplanItem;