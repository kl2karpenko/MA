import Model from 'Model';

class Mailbox extends Model {
	init() {
		this.managedResource = 'mailbox';
	}

	_getRecourseName() {
		return 'mailboxes';
	}

	_getName() {
		let model = this.getModel();

		return model.name &&`${model.name} (${model.number})`;
	}
	
	_defaultMailbox() {
		return {
			"_id": "",
			"name": "",
			"color": "",
			"number": "",
			"type": ""
		};
	}
}

let instance = new Mailbox();

module.exports = (() => {
	return instance;
})();
