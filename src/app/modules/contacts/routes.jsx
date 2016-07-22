import Index from './components/Index.jsx';
import Search from './components/Search.jsx';
import Contacts from './components/Contacts.jsx';
import Extensions from './components/Extensions.jsx';

module.exports = {
	path: '/contacts',
	component: Index,
	indexRoute: {
		onEnter: (nextState, replace) => replace('/contacts/mobile')
	},
	childRoutes: [
		{
			path: '/contacts/search',
			component: Search
		},
		{
			path: '/contacts/mobile',
			component: Contacts
		},
		{
			path: '/contacts/extensions',
			component: Extensions
		}
	]
};
