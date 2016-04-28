import ContactPage from './component/ContactPage.jsx';

module.exports = {
	path: '/contacts/:name',
	getComponent(nextState, cb) {
		cb(null, ContactPage);
	}
};
