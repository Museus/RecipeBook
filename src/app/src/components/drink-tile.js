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
		</Paper>
	);
}

export default DrinkTile;
				

