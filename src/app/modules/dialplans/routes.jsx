import DialplanItem from './components/DialplanItem.jsx';
import DialplansList from './components/DialplansList.jsx';
import DialplanComponent from './components/DialplanComponent.jsx';

module.exports = {
	path: '/dialplans',
	component: DialplanComponent,
	childRoutes: [
		{
			path: '/dialplans/list',
			component: DialplansList
		},
		{
			path: '/dialplans/:id',
			component: DialplanItem
		}
	]
};
