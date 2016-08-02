import Index  from './components/Index.jsx';
import Item   from './components/Item.jsx';
import List   from './components/List.jsx';
import Storage from "models/Storage";
import xhrPool from "lib/abort";

/** Import ================================================================== */

module.exports = {
	path: '/dialplans',
	component: Index,
	childRoutes: [
		{
			path: '/dialplans/list',
			component: List
		},
		{
			path: '/dialplans/:id',
			component: Item
		}
	],
	onEnter: (nextState, replace) => {
		if (Storage.existValue('lockCode') && Storage.getValue("unlock") === "false") {
			replace('/pin');
			xhrPool.abortLast();
		}
	}
};
