import ConnectPage from './component/ConnectPage.jsx';

module.exports = {
	path: '/connect/:name',
	getComponent(nextState, cb) {
		cb(null, ConnectPage);
	}
};
