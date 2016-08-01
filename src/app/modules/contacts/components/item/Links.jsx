import React, { Component }   from 'react';
import LinkButton             from 'components/buttons/LinkButton.jsx';

import { $t }                 from 'lib/locale';

/** Import ================================================================== */

export default class LinksToContacts extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="m-angle-links">
				<LinkButton
					text={$t("contacts.links.mobile")}
					component="a"
					href="/contacts/mobile"
				/>

				<LinkButton
					text={$t("contacts.links.extensions")}
					component="a"
					href="/contacts/extensions"
				/>
			</div>
		);
	}
}