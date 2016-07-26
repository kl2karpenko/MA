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

import AllContacts from "../models/AllContacts";
import Dialplan from "models/Dialplan";

export default class Index extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			searchContacts: AllContacts.getStateBy('searchQuery')			
		}
	}

	render() {
		let
			searchPage = this.props.location.pathname.match("search"),
			RenderOnTop = searchPage ? Search : Links,
			ButtonRender = searchPage ? <LinkButton
				text={<img src={imageLoader(require("images/icons/cross-white-big.png"))} alt="Right"/>}
				component="a"
				className="m-angle__button btn btn-round btn-sm btn-right btn-round-grey"
				href={'/dialplans/' + Dialplan.getValueByPath("_id")}
			/> : <LinkButton
				text={<img src={imageLoader(require("images/icons/search.png"))} alt="Right"/>}
				component="a"
				className="m-angle__button btn btn-round btn-sm btn-right"
				href="/contacts/search"
			/>;
		
		return (
		<AdaptiveWrapper class="l-adaptive-md">
			<Angle header={false}>
				<div className="m-angle-content">
					<AngleTop title="Forward to:"/>
					
					<RenderOnTop
						onChange={(value) => {
							AllContacts.setStateBy('searchQuery', value);
							
							this.setState({
								searchContacts: value
							});
						}}
					/>
				</div>

				{ButtonRender}
			</Angle>
			<AdaptiveFixed>
				<MainScroll>
					{React.cloneElement(this.props.children, {parentState: this.state.searchContacts})}
				</MainScroll>
			</AdaptiveFixed>
		</AdaptiveWrapper>
		);
	}
}