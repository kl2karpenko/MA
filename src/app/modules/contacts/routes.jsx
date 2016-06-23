import Index from './components/Index.jsx';
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
			path: '/contacts/mobile',
			component: Contacts
		},
		{
			path: '/contacts/extensions',
			component: Extensions
		}
	]
};
