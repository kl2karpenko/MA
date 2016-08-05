/** Define Language class for set, get language of app */

import helpers                from "lib/helpers";
import { logError, logInfo }  from "lib/logger";

/** Import ================================================================== */

class Language {
	constructor() {
		this.possibleLanguages = [ "en", "ru" , "nl" ];
		this.defaultLanguage = "en";

		this.$t = this.$t.bind(this);
		this.setLanguage = this.setLanguage.bind(this);
	}

	changeLanguage(langName) {
		this.setLanguage(langName);
	}

	setCurrentLanguageOfDevice() {
		let globalization = require('globalization');

		return globalization
			.getCurrentLanguage()
			.then((lang) => {
				let langDefine = lang && lang.slice(0, 2);

				this.setLanguage(langDefine);

				return lang;
			});
	}

	setLanguage(name) {
		if (!name || this.possibleLanguages.indexOf(name) === -1) {
			logError("locale", "no language found, set default >>> en <<<");
			name = this.defaultLanguage;
		}

		this.language = name;
		this.languageFile = require("json!lang/" + name + ".json");
	}

	$t(path) {
		if (!path) {
			logError("locale", "no path  to phrase: ");
		}

		return this.languageFile && (helpers.getValueByPath(path, this.languageFile));
	}
}

let language = new Language();

module.exports = language;