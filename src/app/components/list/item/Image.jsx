import React, { Component } from 'react';

import imageLoader from 'imageLoader';

export default class Image extends Component {
	constructor(props) {
		super(props);

		console.log(this.props.src);
	}

	render() {
		return (
			<img className="img-circle pull-left" src={(typeof this.props.src === "string" && this.props.src)
			|| imageLoader(require("images/photo-placeholder.png"))} alt={this.props.title}/>
		);
	}
}
