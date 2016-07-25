import React, { Component } from 'react';

import imageLoader from 'imageLoader';

import AdaptiveFixed from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

import Angle from 'components/modules/angle/Index.jsx';
import AngleTop from 'components/modules/angle/Top.jsx';

import MainScroll from 'components/layouts/main/Scroll.jsx';
import LinkButton from 'components/buttons/LinkButton.jsx';

import Links from './item/Links.jsx';
import Search from './item/Search.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let searchPage = this.props.location.pathname.match("search");
		let RenderOnTop = searchPage ? Search : Links;

		// console.log();
		
		return (
		<AdaptiveWrapper class="l-adaptive-md">
			<Angle header={false}>
				<div className="m-angle-content">
					<AngleTop title="Forward to:"/>
					
					<RenderOnTop/>
				</div>

				<LinkButton
					text={<img src={imageLoader(require("images/icons/search.png"))} alt="Right"/>}
					component="a"
					className="m-angle__button btn btn-round btn-sm btn-right"
					href="/contacts/search"
				/>
			</Angle>
			<AdaptiveFixed>
				<MainScroll>
					{this.props.children}
				</MainScroll>
			</AdaptiveFixed>
		</AdaptiveWrapper>
		);
	}
}