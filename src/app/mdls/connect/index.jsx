import ConnectPage from './component/ConnectPage.jsx';
import ConnectMain from './component/ConnectMain.jsx';
import ConnectByQR from './component/ConnectByQR.jsx';
import ConnectByPIN from './component/ConnectByPIN.jsx';

module.exports = {
	path: '/connect',
	component: ConnectPage,
	childRoutes: [
		{
			path: '/connect/main',
			component: ConnectMain
		},
		{
			path: '/connect/qr',
			component: ConnectByQR
		},
		{
			path: '/connect/pin',
			component: ConnectByPIN
		}
	]
};
