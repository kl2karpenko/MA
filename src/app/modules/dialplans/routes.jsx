import Index  from './components/Index.jsx';
import Item   from './components/Item.jsx';
import List   from './components/List.jsx';

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
	]
};
