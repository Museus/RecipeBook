import React from 'react';

import Grid from '@material-ui/core/Grid';
import DrinkTile from './drink-tile.js';


function DrinkDisplay(props) {

	return(
		<Grid className="drink-display">
			<DrinkTile drinkInfo={props.displayDrinks[0]} />
		</Grid>
	);
}

export default DrinkDisplay;
