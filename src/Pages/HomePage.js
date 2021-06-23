import React from 'react';
import Navbar from './Components/Navbar';
import WelcomeSection from './Components/WelcomeSection';
import DescriptionSection from './Components/DescriptionSection';
import NyepedaSection from './Components/NyepedaSection';
import Cards from './Components/Cards';

class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: []
		}
	}


	render() {
		return (
			<>
			<Navbar/>
			<WelcomeSection/>
			<Cards/>
			<NyepedaSection/>
			<br/>
			<br/>
			<DescriptionSection/>
			</>
		)

	}

}

// const mapStateToProps = (state) => {
// 	return {

// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 	}
// }

export default HomePage;
