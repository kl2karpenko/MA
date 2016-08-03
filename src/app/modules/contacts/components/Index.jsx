import React, { Component }   from 'react';
import { hashHistory }        from 'react-router';

import imageLoader            from 'imageLoader';
import Tappable               from 'react-tappable';

import AdaptiveFixed          from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper        from 'components/layouts/adaptive/Wrapper.jsx';

import Angle                  from 'components/modules/angle/Index.jsx';
import AngleTop               from 'components/modules/angle/Top.jsx';

import MainScroll             from 'components/layouts/main/Scroll.jsx';

import Links                  from './item/Links.jsx';
import Search                 from './item/Search.jsx';

import Dialplan               from "models/Dialplan";

import ContactsComponent      from './Contacts.jsx';
import ExtensionsComponent    from './Extensions.jsx';

import { $t }                 from 'lib/locale';

/** Import ================================================================== */

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchContacts: "",
			pageType: "list",
			pageId: props.params.name
		};

		this._changeSearchState = this._changeSearchState.bind(this);
		this._startSearch = this._startSearch.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			pageId: nextProps.params.name
		});
	}

	_changeSearchState(value) {
		this.setState({
			searchContacts: value
		});
	}

	_setActiveContact(i, contactData) {
		let id = Dialplan.getValueByPath("_id");

		if (!id) {
			hashHistory.replace('/dialplans');
			return;
		}

		Dialplan
			._saveFollowToTransfer({
				number: contactData.number,
				type: "contact"
			})
			.then(() => {
				hashHistory.replace('/dialplans/' + Dialplan.getValueByPath("_id"));
			});
	}
	
	_startSearch() {
		this.setState({
			pageType: "search"
		});
	}

	static _leave() {
		hashHistory.replace('/dialplans/' + Dialplan.getValueByPath("_id"));
	}

	render() {
		let
			pageRender = this.state.pageId === "mobile" ?
				<ContactsComponent search={this.state.searchContacts}/> :
				<ExtensionsComponent search={this.state.searchContacts}/>,

			isSearchPage = this.state.pageType !== "list",
			RenderOnTop = !isSearchPage ? Links : Search,
			classes = !isSearchPage ? "m-angle__button btn btn-round btn-sm btn-right"
				: "m-angle__button btn btn-round btn-sm btn-right btn-round-grey",

			imgName = !isSearchPage ? "search" : "cross-white-big";

		return (<AdaptiveWrapper class="l-adaptive-md">
			<Angle header={false}>
				<div className="m-angle-content">
					<AngleTop title={$t("contacts.forward")}/>
					
					<RenderOnTop onChange={this._changeSearchState} />
				</div>

				<Tappable
					component="button"
					className={classes}
					onTap={!isSearchPage ? this._startSearch : Index._leave}
				>
				<img src={imageLoader(require("images/icons/" + imgName + ".png"))} alt="Right"/>
				</Tappable>
			</Angle>
			<AdaptiveFixed>
				<MainScroll>
					{pageRender}
				</MainScroll>
			</AdaptiveFixed>
		</AdaptiveWrapper>);
	}
}