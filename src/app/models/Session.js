import Model from 'Model';

class Session extends Model {
	init() {
		this.managedResource = 'session';
	}

	_defaultSession() {
		return {
			"_id": "",
			"id": "",
			"username": "",
			"dialplan": {
				"id": ""
			}
		};
	}

	_getSessionData() {
		let
			defaultModel = this.getModel(),
			userID = defaultModel.user && defaultModel.user.id || null;

		return this.load({
			id: userID
		});
	}
}

const session = new Session();

module.exports = (() => {
	return session;
})();