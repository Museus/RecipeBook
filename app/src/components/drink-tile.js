import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function DrinkTile(props) {

	return(
		<Paper className="drink-tile">
			<Typography variant="h6">
				{props.drinkInfo.name}
			</Typography>

			<Typography variant="subtitle2">
				{props.drinkInfo.category}
			</Typography>

			<Typography varient="subtitle2">
			{props.drinkInfo.ingredients.map(ingr => {
				if(ingr.ingredient !== undefined) {
					return (ingr.amount + " " + ingr.unit + " " + ingr.ingredient + ", ")
				} else {
					return (ingr.special + ", ")
				}
			})}
			</Typography>
		</Paper>
	);
}

export default DrinkTile;
				

