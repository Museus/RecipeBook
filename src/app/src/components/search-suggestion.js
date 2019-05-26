import React from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';


function SearchSuggestion(props) {

	return (
		<div id="filter-search">
			<h3>Need a suggestion?</h3>
			<div className="flex-container">
				<div id="ingredients-include" className="ingredients-list">
					<h4>Which ingredients should we include?</h4>
					<Select
						isMulti
						className="multiselect-ingredients"
						options={props.ingrOptions}
						onChange={props.updateInclude}
					/>
				</div>
				<div id="ingredients-avoid" className="ingredients-list">
					<h4>Which ingredients should we avoid?</h4>
					<Select
						isMulti
						className="multiselect-ingredients"
						options={props.ingrOptions}
						onChange={props.updateExclude}
					/>
				</div>
			</div>

			<Button 
				id="suggestion-button"
				value="Search"
				margin="normal"
				variant="contained"
				color="primary"
			>
			Search by Ingredients
			</Button>
		</div>
	);
}

export default SearchSuggestion;
