import React, { Component } from 'react';

import imageLoader from 'imageLoader';

export default class Image extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<img className="img-circle pull-left" src={imageLoader(require("images/photo-placeholder.png"))} alt={this.props.title}/>
		);
	}
}
