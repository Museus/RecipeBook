import React, { Component } from 'react';

class SearchSpecific extends Component {
	constructor(props) {
		super(props);

		this.state = {
			drinkName: ''
		}

		this.handleFormSubmit = this.handleFormSubmit.bind(this);

		handleFormSubmit() {
			drinkName
		}

		render() {
			return (
				<div className="specific-search">
					Looking for something specific?
					<form className="specific-form" onSubmit={this.handleFormSubmit}>
						<Input />	/* Input for drink name */
						<Button />	/* Button to submit form */
					</form>
				</div>
			);
		}
	}
}
