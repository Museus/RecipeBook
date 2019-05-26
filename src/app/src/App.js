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
			ingredientsInclude: '',
			ingredientsAvoid: '',
			displayDrinks: []
		};
		
		this.handleResults = this.handleResults.bind(this);
	}

	handleResults(drinkList) {
		console.log("Got handed " + drinkList.length + " drinks.");
		this.setState({displayDrinks: drinkList});
	}

	render() {
		return (
			<div className="center-container">
				<SearchSpecific 
					drinkName={this.state.specificSearchName} 
					displayDrinks={this.state.displayDrinks}
					updateResults={this.handleResults}
				/>
				<SearchSuggestion 
					ingredientsInclude={this.state.ingredientsInclude}
					ingredientsAvoid={this.state.ingredientsAvoid}
					updateResults={this.handleResults}
				/>
				{
				this.state.displayDrinks.length != 0 &&
				<DrinkDisplay displayDrinks={this.state.displayDrinks} />
				}
			</div>
		);
	}
}

export default App ;

