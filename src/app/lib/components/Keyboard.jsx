import React from 'react';
import { Link } from 'react-router';

export default class Keyboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="m-keyboard">
				<div className="m-keyboard-digits">
					{[...Array(9)].map((x, i) =>
						<div className="col-xs-5 m-keyboard-digit">
							<button className="m-keyboard__key">{i + 1}</button>
						</div>
					)}
				</div>
				<div className="m-keyboard-buttons">
					<div className="col-xs-5 m-keyboard-digit">
						<button className="m-keyboard__key">

						</button>
					</div>
					<div className="col-xs-5 m-keyboard-digit">
						<button className="m-keyboard__key">0</button>
					</div>
					<div className="col-xs-5 m-keyboard-digit">
						<div className="m-keyboard__key">
							<a href="#" className="btn-round btn-sm btn-check"></a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}