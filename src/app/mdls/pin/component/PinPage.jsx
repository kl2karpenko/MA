import React from 'react';

import Keyboard from 'components/Keyboard.jsx';

class PinPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="l-adaptive">
				<div className="l-pin">
					<div className="l-pin-wrapper">
						<div className="l-pin-center">
							<div className="l-pin__name">Enter the code</div>
							<div className="l-pin__spaces">
								<form className="row">
									{[...Array(5)].map((x, i) =>
										<div className="col-xs-3 l-pin__space">
											<div>
												<input type="password" className="l-pin__pinLetters"/>
											</div>
										</div>
									)}
								</form>
							</div>
						</div>
					</div>
					<Keyboard/>
				</div>
			</div>
		);
	}
}

module.exports = PinPage;