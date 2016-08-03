import React, { Component } from 'react';
import imageLoader from 'imageLoader';

import Tappable               from 'react-tappable';

export default class Angle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			previous: props.previous ? '' : ' disabled',
			next: props.next ? '' : ' disabled'
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			previous: props.previous ? '' : ' disabled',
			next: props.next ? '' : ' disabled'
		});
	}

	render() {
		return (
			<div className="m-angle__arrows">
				<Tappable
				component="button"
				className={"m-angle-arrow __left" + this.state.previous}
				onTap={this.props.onClick}
				>
					<img className="img-responsive previous" onClick={(e) => {
						e.stopPropagation();
					}} src={imageLoader(require("images/icons/arrow-left.png"))} alt="Left"/>
				</Tappable>

				<Tappable
					component="button"
					className={"m-angle-arrow __right" + this.state.next}
					onTap={this.props.onClick}
				>
					<img className="img-responsive next" src={imageLoader(require("images/icons/arrow-right.png"))}
					     onClick={(e) => {
						     e.stopPropagation();
					     }}
					     alt="Left"/>
				</Tappable>
			</div>
		);
	}
}