import { describe } from 'riteway';
import render from 'riteway/render-component';
import React from 'react';
import DrinkTile from '../src/components/drink-tile.js';
describe('DrinkTile component', async assert => {
	const name = 'Alexander';
	const category = 'Cocktail';
	const ingredients = {[
		{
			ingredient: "Cognac",
			amount: 3,
			unit: "cl"
		},
		{
			ingredient: "Creme de Cacao (brown)",
			amount: 3,
			unit: "cl"
		},
		{
			ingredient: "Cream",
			amount: 3,
			unic: "cl"
		}
	]};
	const 
		
	const $ = render(<DrinkTile userName={userName} />);
	assert({
		given: 'A drink recipe',
		should: 'Render a summary of the recipe.',
		actual: $('.greeting')
		.html()
		.trim(),
expected: `Hello, ${userName}!`
});
});
