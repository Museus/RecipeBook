import React, { Component } from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';


class SearchSuggestion extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ingredientsInclude: '',
			ingredientsAvoid: '',
			ingredientsOptions: [{"label": 'this', "value": 'that'}]
		}

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.axios = require('axios');
	}

	componentDidMount() {
		this.axios.get('http://127.0.0.1:5000/ingredients')
			.then(response => {
			this.setState({ ingredientsOptions: response.data });
		});
	}

	handleFormSubmit() {
		this.axios.get('http://127.0.0.1:5000/drink', {
			params: {
				"name": this.state.drinkName
			}
		}).then(function(response) {
			console.log(response);
		}).catch(function(error) {
			console.log(error);
		}).finally(function(error) {
			console.log("Finished");
		});

	}

	render() {
		return (
			<div id="filter-search">
				<h3>Looking for something specific?</h3>
				<form className="filter-form" onSubmit={this.handleFormSubmit}>
					<div id="ingredients-include">
						Which ingredients should we include?
						<Select
							isMulti
							options={this.state.ingredientsOptions}
							name="include"
						/>
					</div>
					<div id="ingredients-avoid">
						Which ingredients should we avoid?
						<Select
							isMulti
							options={this.state.ingredientsOptions}
							name="avoid"
						/>
					</div>

					<Button 
						id="suggestion-button"
						value="Search"
						margin="normal"
						variant="contained"
					/>		
				</form>
			</div>
		);
	}
}

export default SearchSuggestion;
