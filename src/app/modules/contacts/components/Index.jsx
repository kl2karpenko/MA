import React, { Component } from 'react';
import { Link } from 'react-router';

import imageLoader from 'imageLoader';

import AdaptiveFixed from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

import Angle from 'components/modules/angle/Index.jsx';
import AngleTop from 'components/modules/angle/Top.jsx';

import MainScroll from 'components/layouts/main/Scroll.jsx';
import LinkButton from 'components/buttons/LinkButton.jsx';

export default class ContactPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<AdaptiveWrapper class="l-adaptive-md">
			<Angle header={false}>
				<div className="m-angle-content">
					<AngleTop title="Forward to:"/>

					<div className="m-angle-links">

						<LinkButton
							text="Mobile"
							component="a"
							className=""
							href="/contacts/mobile"
							/>

						<LinkButton
							text="Extensions"
							component="a"
							className=""
							href="/contacts/extensions"
							/>
					</div>
				</div>

				<button className="m-angle__button btn btn-round btn-sm btn-right">
					<img src={imageLoader(require("images/icons/search.png"))} alt="Right"/>
				</button>
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