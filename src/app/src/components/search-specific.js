import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function SearchSpecific(props) {
	return (
		<div id="specific-search">
			<h3>Looking for something specific?</h3>
			<div className="specific-form">
				<TextField
					id="specific-search-input"
					label="Drink Name"
					onChange={props.updateName}
					variant="filled"
				/>

				<Button	
					id="specific-search-button"
					onClick={props.searchFunction}
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

export default SearchSpecific;

