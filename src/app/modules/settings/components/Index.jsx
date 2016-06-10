import React, {Component} from 'react';
import { Link, hashHistory } from 'react-router';

import imageLoader from 'lib/imageLoader';

import Keyboard from 'components/Keyboard.jsx';

export default class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isValid: false,
			pinValue: "",
			element: ""
		};

		this.keyBoardOptions = {

		}
	}

	render() {
		return (
			<div className="l-adaptive-wrapper">
				<div className="l-adaptive l-adaptive-sm l-fixed">
					<div className="m-angle">
						<div className="m-angle-wrapper">
							<div className="m-angle-content">
								<div className="m-angle-top">
									<div className="m-angle-name">
										Settings
									</div>
								</div>
							</div>

							<Link activeClassName="active" className="m-angle__button btn btn-round btn-sm btn-list btn-round-grey" to="/dialplans/list">
								<img src={imageLoader(require("images/icons/cross-white-big.png"))} alt="Right"/>
							</Link>
						</div>
					</div>

					<div className="l-main l-main-settings">
						<div className="l-main-scroll">
							<div className="l-grey l-grey-md">
								<label htmlFor="pinOn" className="checkbox-block m-label clearfix">
									<div className="l-grey-header pull-left">
										Password at login
									</div>
									<input type="checkbox" name="pinOn" id="pinOn"/>
									<div className="checkbox-button pull-right"></div>
								</label>
							</div>

							<div className="l-settings l-main-content">
								<form action="">
									<div className="l-settings-group">
										<input type="password" className="input-custom" placeholder="Enter current" maxLength="5"/>
									</div>
									<div className="l-settings-group">
										<input type="password" className="input-custom" placeholder="Enter new pincode" maxLength="5"/>
									</div>
									<div className="l-settings-group">
										<input type="password" className="input-custom" placeholder="Reenter new pincode" maxLength="5"/>
									</div>
								</form>
							</div>

							<div className="l-grey">
								<div className="l-grey-header">
									General settings
								</div>
							</div>

							<div className="l-main-content">
								<Link className="btn btn-block btn-block-lg btn-disconnect" to="/">Disconnect app</Link>
							</div>
						</div>
					</div>
				</div>


				<div className="l-keyboard l-keyboard-fixed">
					<Keyboard
						options={{

									}}
						getParentContext={() => {
					          return this;
					        }}
					/>
				</div>
			</div>
		);
	}
}