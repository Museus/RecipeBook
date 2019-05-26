import React, { Component } from 'react';

import SearchSpecific from './search-specific.js';
import SearchSuggestion from './search-suggestion.js';

class DrinkApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
		}

	}

	render() {
		return (
			<h1>What Can I Make?</h1>
			<SearchSpecific searchName={this.state.specificSearchName} />
			<SearchSuggestions
				ingredientsInclude={this.state.ingredientsInclude}
				ingredientsAvoid={this.state.ingredientsAvoid}
			/>
		);
	}
}
export default DrinkApp;
