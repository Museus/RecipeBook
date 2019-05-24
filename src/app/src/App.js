import React, { Component } from 'react';

/* Import components */
import SearchSpecific from './components/search-specific.js';
import SearchSuggestion from './components/search-suggestion.js';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			specificSearchName: '',
			ingredientsInclude: '',
			ingredientsAvoid: ''
		};
	}

	render() {
		return (
			<div className="center-container">
			<SearchSpecific drinkName={this.state.specificSearchName}  />
			<SearchSuggestion />
			</div>
		);
	}
}

export default App ;

