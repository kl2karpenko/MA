import React, { Component } from 'react';

import imageLoader from 'imageLoader';

export default class Image extends Component {
	constructor(props) {
		super(props);
	}

	_getImageName() {
		let
			images = ["dialplan", "extension"],
			imageToSet = this.props.type || "extension";

		return images.indexOf(imageToSet) === -1 ? "extension" : imageToSet;
	}

	render() {
		return (
			<img className="img-circle pull-left" src={(typeof this.props.src === "string" && this.props.src)
			|| imageLoader(require("images/placeholder/" + this._getImageName() + ".png"))} alt={this.props.title}/>
		);
	}
}
