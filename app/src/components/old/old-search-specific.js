import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class SearchSpecific extends Component {

	constructor(props) {
		super(props);

		this.state = {
			results: []
		}

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.axios = require('axios');
	}

	componentDidMount() {
		console.log("Triggered.");
	}

	handleChange(event) {
		this.props.updateName(event);	
	}

	handleFormSubmit() {
		console.log("Submitted form");
		const this_ref = this;
		this.axios.get('http://127.0.0.1:5000/drink', {
			params: {
				"name": this.state.drinkName
			}

		}).then(response =>  {
			console.log("Received response of length " + response.data.length);
			var drinkList = [];
			for(var index = 0; index < response.data.length; index++) {
				console.log(response.data[index]);
				this_ref.setState({results: [...this_ref.state.results, response.data[index]]});
				drinkList.push(response.data[index]);
			}
			console.log("Added " + drinkList.length + " drinks to list.");
			this_ref.props.updateResults(drinkList);
		}).catch(error => {
			console.log("Error: " + error);
		});
	}

	render() {
		return (
			<div id="specific-search">
				<h3>Looking for something specific?</h3>
				<div className="specific-form">
					<TextField
						id="specific-search-input"
						label="Drink Name"
						onChange={this.handleChange}
						variant="filled"
					/>

					<Button	
						id="specific-search-button"
						onClick={this.handleFormSubmit}
						value="Search"
						margin="normal"
						variant="contained"
						color="primary"
					>
					Search by Name
					</Button>
				</div>
			</div>
		);
	}
}

export default SearchSpecific;

