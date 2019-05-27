import React from 'react';

import DrinkTile from './drink-tile.js';


function DrinkDisplay(props) {

	return(
		<>
		{
			props.drinkResults.map((drink, index) => {
				return <DrinkTile drinkInfo={drink} className="drink-tile" />
			})
		}
		</>
	);
}

export default DrinkDisplay;
