import Model from 'Model';

class Session extends Model {
	init() {
		this.managedResource = 'session';
		this.isSingle = true;

		this.failConnection = false;
	}

	_defaultSession() {
		return {
			"user": {
				"_id": "",
				"id": "",
				"username": ""
			},
			"permissions": {
				"role": ""
			},
			"dialplan": {
				"id": ""
			},
			"settings": {
				"pin": {
					is_on: false,
					active: null,
					created: null,
					created_copy: null
				}
			}
		};
	}

	_isAdmin() {
		return this.getModel().permissions.role === "administrator"
	}

	_isConnected() {
		return this.getModel().user !== undefined;
	}

	_hasPinCode() {
		return this.getModel().settings.pin.is_on;
	}

	_getSessionData() {
		return this
			.load()
			.done(() => {
				this.failConnection = false;
			})
			.fail(() => {
				this.failConnection = "Server is unavailable, please try again later =(";
			});
	}
}

const session = new Session();

module.exports = (() => {
	return session;
})();