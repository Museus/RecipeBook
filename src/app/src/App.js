import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

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

		this.theme = createMuiTheme({
			palette: {
				primary: {
					main: '#cc99cc',
				},
			},
		});
	}

	render() {
		return (
			<div className="center-container">
				<h1>What Can I Make?</h1>
				<SearchSpecific theme={this.theme} />
				<SearchSuggestion theme={this.theme} />
			</div>
		);
	}
}

export default App ;

