import Model from './Model';

let UserModel = {
	"_id": "",
	"_rev": "",
	"first_name": "Liliia",
	"second_name": "",
	"email": "",
	"image_id": "",
	"organization_id": "",
	"username": "",
	"type": "user",
	"extension": {
		"_id": "",
		"in_number": "",
		"com_id": "",
		"caller_id": "",
		"caller_number": "",
		"user_id": "",
		"type": ""
	},
	"mailbox": {
		"_id": "",
		"_rev": "",
		"enabled": false,
		"number": "",
		"owner_id": ""
	}
};

class User extends Model {
	_defaultUser() {
		return UserModel;
	}
}

module.exports = User;