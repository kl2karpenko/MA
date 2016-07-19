import Model from 'Model';

import Storage from 'models/Storage';

class Session extends Model {
	init() {
		this.managedResource = 'session';
		this.isSingle = true;

		this.failConnection = false;
	}

	_defaultSession() {
		return {
			"authorization": {
				"token": Storage.getValue("authorization")
			}
		};
	}

	_isConnected() {
		//return Storage.getValue("authorization");
		return true;
	}

	_getSessionData() {
		return this.load();
	}
}

const session = new Session();

module.exports = (() => {
	return session;
})();