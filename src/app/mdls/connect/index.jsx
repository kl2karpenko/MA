module.exports = {
	path: '/connect/:name',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./component/ConnectPage.jsx'))
		})
	}
};
