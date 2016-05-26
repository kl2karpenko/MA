import React, { Component } from 'react';

import imageLoader from 'lib/imageLoader';

class DialpanListItem extends Component {
	constructor(props) {
		super(props);

		this.state = props.dialplan;
	}

	render() {
		return (
			<div className="m-list-item clearfix">
				<div className="col-xs-3">
					<img className="img-circle img-responsive" src={imageLoader(require("images/photo-placeholder.png"))} alt="Qr background"/>
				</div>
				<div className="col-xs-9">
					<h3 className="m-list-name">{this.state.title}</h3>
					<div className="m-list-phone">{this.state.ex_number || this.state.in_number}</div>
				</div>
			</div>
		);
	}
}

module.exports = DialpanListItem;