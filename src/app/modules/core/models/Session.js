import Model from 'mainModel';

class Session extends Model {
	initialize() {
		this.managedResource = 'session';

		return session;
	}

	_defaultSession() {
		return {
			"user": {
				"_id": "",
				"id": "",
				"username": "",
				"dialplan": {
					"id": ""
				}
			}
		};
	}
}

let session = new Session();

module.exports = session.initialize();