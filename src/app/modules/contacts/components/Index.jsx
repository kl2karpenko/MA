import React, { Component } from 'react';
import { Link } from 'react-router';

import imageLoader from 'imageLoader';

import AdaptiveFixed from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

import Angle from 'components/modules/angle/Index.jsx';
import AngleTop from 'components/modules/angle/Top.jsx';
import AngleInfo from 'components/modules/angle/InfoCenter.jsx';

import MainScroll from 'components/layouts/main/Scroll.jsx';

export default class ContactPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<AdaptiveWrapper>
			<AdaptiveFixed>
				<Angle header={false}>
					<div className="m-angle-content">
						<AngleTop title="Forward to:"/>

						<AngleInfo>
							<Link to="/contacts/mobile">Mobile</Link>
							<Link to="/contacts/extensions">Extensions</Link>
						</AngleInfo>
					</div>

					<button className="m-angle__button btn btn-round btn-sm btn-right">
						<img src={imageLoader(require("images/icons/search.png"))} alt="Right"/>
					</button>
				</Angle>

				<MainScroll>
					{this.props.children}
				</MainScroll>
			</AdaptiveFixed>
		</AdaptiveWrapper>
		);
	}
}