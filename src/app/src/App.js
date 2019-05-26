import React, { Component } from 'react';

/* Import components */
import SearchSpecific from './components/search-specific.js';
import SearchSuggestion from './components/search-suggestion.js';
import DrinkDisplay from './components/drink-display.js';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			specificSearchName: '',
			ingredientsInclude: [],
			ingredientsExclude: [],
			ingredientsOptions: [],
			drinkResults: []
		};
		
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSearchSpecific = this.handleSearchSpecific.bind(this);
		this.handleInclIngr = this.handleInclIngr.bind(this);
		this.handleExclIngr = this.handleExclIngr.bind(this);
		this.axios = require('axios');
	}

	handleSearchSpecific() {
		const this_ref = this;
		this.axios.get('http://127.0.0.1:5000/drink', {
			params: {
				'name': this.state.specificSearchName
			}
		}).then(response => {
			var drinkList = [];

			for(var i=0; i < response.data.length; i++)
				drinkList.push(response.data[i]);

			this_ref.setState({ drinkResults: drinkList });
		}).catch(error => {
			console.log("Error: " + error);
		});
	}

	handleNameChange = (event) => {
		this.setState({
			specificSearchName: event.target.value
		});
	}

	handleInclIngr = (selectedOption) => {
		this.setState({
			ingredientsInclude: selectedOption
		});
	}

	handleExclIngr = (selectedOption) => {
		this.setState({
			ingredientsExclude: selectedOption
		});
	}


	render() {
		return (
			<div className="center-container">
				<SearchSpecific 
					updateName={this.handleNameChange}
					searchFunction={this.handleSearchSpecific}
				/>
				<SearchSuggestion 
					updateInclude={this.handleInclIngr}
					updateExclude={this.handleExclIngr}
					searchFunction={this.handleSearchSuggestion}
				/>
				{
				this.state.drinkResults.length !== 0 &&
				<DrinkDisplay displayDrinks={this.state.drinkResults} />
				}
			</div>
		);
	}
}

export default App ;

