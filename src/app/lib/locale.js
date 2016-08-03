import helpers from "lib/helpers";

class Language {
	constructor() {
		this.possibleLanguages = [ "en", "ru" ];
		this.defaultLanguage = "en";

		this.$t = this.$t.bind(this);
		this.setLanguage = this.setLanguage.bind(this);
	}

	changeLanguage(langName) {
		this.setLanguage(langName);
	}

	setCurrentLanguageOfDevice() {
		let globalization = require('globalization');

		return globalization.getCurrentLanguage().then((lang) => {
			let langDefine = lang && lang.slice(0, 2);

			console.log('define', langDefine);

			this.setLanguage(langDefine);
			
			return lang;
		});
	}

	setLanguage(name) {
		if (!name || this.possibleLanguages.indexOf(name) === -1) {
			name = this.defaultLanguage;
		}

		this.language = name;
		this.languageFile = require("json!lang/" + name + ".json");
		this.languageFileDefault = name !== "en" ? require("json!lang/en.json") : this.languageFile;
	}

	$t(path) {
		let translation = this.languageFile && (helpers.getValueByPath(path, this.languageFile) ||
			helpers.getValueByPath(path, this.languageFileDefault));

		return translation;
	}
}

let language = new Language();

module.exports = language;