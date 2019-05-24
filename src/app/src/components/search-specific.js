import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class SearchSpecific extends Component {

	constructor(props) {
		super(props);

		this.state = {
			drinkName: ''
		}

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.axios = require('axios');
	}

	handleChange(event) {
		this.setState({
			'drinkName': event.target.value
		});
	}

	handleFormSubmit() {
		this.axios.get('http://127.0.0.1:5000/drink', {

			params: {
				"name": this.state.drinkName
			}
		}).then(response => {
			console.log(response);
		});
	}

	render() {
		return (
			<div id="specific-search">
				<h2>Looking for something specific?</h2>
				<form className="specific-form" onSubmit={this.handleFormSubmit}>
					<TextField
						id="specific-search-input"
						label="Drink Name"
						className={'search-input'}
						value={this.state.drinkName}
						onChange={this.handleChange}
						margin="normal"
						variant="outlined"
					/>

					<Button	
						id="specific-search-button"
						type="submit"
						value="Search"
						margin="normal"
						variant="contained"
					/>
				</form>
			</div>
		);
	}
}

export default SearchSpecific;

