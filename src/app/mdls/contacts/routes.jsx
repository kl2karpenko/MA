import ContactPage from './components/ContactPage.jsx';

module.exports = {
	path: '/contacts/:name',
	getComponent(nextState, cb) {
		cb(null, ContactPage);
	}
};
