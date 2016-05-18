import ConnectPage from './components/ConnectPage.jsx';
import ConnectMain from './components/ConnectMain.jsx';
import ConnectByQR from './components/ConnectByQR.jsx';
import ConnectByPIN from './components/ConnectByPIN.jsx';

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
