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
			ingrInclude: [],
			ingrExclude: [],
			ingrOptions: [],
			drinkResults: []
		};
		
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSearchSpecific = this.handleSearchSpecific.bind(this);
		this.handleSearchSuggestion = this.handleSearchSuggestion.bind(this);
		this.handleInclIngr = this.handleInclIngr.bind(this);
		this.handleExclIngr = this.handleExclIngr.bind(this);
		this.parseParams = this.parseParams.bind(this);
		this.axios = require('axios');
		this.qs = require('qs');
	}

	componentDidMount() {
		this.axios.get('http://127.0.0.1:5000/ingredients')
		.then(response => {
			this.setState({ingrOptions: response.data});
		});
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

	handleSearchSuggestion() {
		const this_ref = this;

		this.axios.get('http://127.0.0.1:5000/suggestion', {
			params: {
				'ingrInclude': this_ref.state.ingrInclude,
				'ingrExclude': this_ref.state.ingrExclude
			},
			paramsSerializer: params => {
				return this_ref.parseParams(params)
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

	parseParams = (params) => {
		let options = '';
		
		const keys = Object.keys(params);
		keys.forEach(key => {
			params[key].forEach(ingr => {
				options += key + '=' + ingr.value + '&';
			});
		});

		console.log(options);
		return options;
	};

	handleNameChange = (event) => {
		this.setState({
			specificSearchName: event.target.value
		});
	}

	handleInclIngr = (selectedOption) => {
		this.setState({
			ingrInclude: selectedOption
		});
	}

	handleExclIngr = (selectedOption) => {
		this.setState({
			ingrExclude: selectedOption
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
					ingrOptions={this.state.ingrOptions}
				/>
				{
				this.state.drinkResults.length !== 0 &&
				<DrinkDisplay drinkResults={this.state.drinkResults} />
				}
			</div>
		);
	}
}

export default App ;

