import React, { Component }   from 'react';
import { hashHistory }        from 'react-router';

import imageLoader            from 'imageLoader';

import AdaptiveFixed          from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper        from 'components/layouts/adaptive/Wrapper.jsx';

import Angle                  from 'components/modules/angle/Index.jsx';
import AngleTop               from 'components/modules/angle/Top.jsx';

import MainScroll             from 'components/layouts/main/Scroll.jsx';
import LinkButton             from 'components/buttons/LinkButton.jsx';

import Links                  from './item/Links.jsx';
import Search                 from './item/Search.jsx';

import AllContacts            from "../models/AllContacts";
import Dialplan               from "models/Dialplan";

import { $t }                 from 'lib/locale';

/** Import ================================================================== */

export default class Index extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			searchContacts: AllContacts.getStateBy('searchQuery'),
			loc: props.location.pathname
		};

		this._changeSearchState = this._changeSearchState.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			loc: nextProps.location.pathname
		});
	}

	_changeSearchState(value) {
		AllContacts.setStateBy('searchQuery', value);

		this.setState({
			searchContacts: value
		});
	}

	_setActiveContact(i, contactData) {
		let id = Dialplan.getValueByPath("_id");

		if (!id) {
			hashHistory.push('/dialplans');
			return;
		}

		Dialplan
			._saveFollowToTransfer({
				number: contactData.number,
				type: "contact"
			})
			.then(() => {
				hashHistory.push('/dialplans/' + Dialplan.getValueByPath("_id"));
			});
	}

	render() {
		let
			pathname = this.state.loc,
			searchPage = pathname.match("search"),
			RenderOnTop = Links,
			classes = "m-angle__button btn btn-round btn-sm btn-right",
			imgName = "search",
			childrenProps =this.props.children,
			href = "/contacts/search";

		if (searchPage) {
			RenderOnTop = Search;
			classes = "m-angle__button btn btn-round btn-sm btn-right btn-round-grey";
			href = '/dialplans/' + Dialplan.getValueByPath("_id");
			imgName = "cross-white-big";
			childrenProps = React.cloneElement( this.props.children,
			{ parentState: this.state.searchContacts });
		}

		return (
		<AdaptiveWrapper class="l-adaptive-md">
			<Angle header={false}>
				<div className="m-angle-content">
					<AngleTop title={$t("contacts.forward")}/>
					
					<RenderOnTop onChange={this._changeSearchState} />
				</div>

				<LinkButton
					text={<img src={imageLoader(require("images/icons/" + imgName + ".png"))} alt="Right"/>}
					component="a"
					className={classes}
					href={href}
				/>
			</Angle>
			<AdaptiveFixed>
				<MainScroll>
					{ childrenProps }
				</MainScroll>
			</AdaptiveFixed>
		</AdaptiveWrapper>
		);
	}
}