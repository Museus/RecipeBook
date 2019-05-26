import React, { Component } from 'react';

class NavBar extends Component {
	constructor(props) {
		super(props);

	}
	

	render() {
		return(
			<div className="navbar-top">
				<NavBarButton href="index.html">
					Find a Drink
				</NavBarButton>
				<NavBarButton href="index.html">
					About
				</NavBarButton>
				<NavBarButton href="index.html">
					Contact Us
				</NavBarButton>
			</div>
		);
	}
}

export default NavBar;
			
}
