import React from 'react';

import Main from 'components/layouts/main/Index.jsx';

export default class MainConnect extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<Main 
			class="l-main-connect" 
      center={this.props.children}
		/>
		);
	}
}