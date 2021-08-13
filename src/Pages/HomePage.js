import React from 'react';
import WelcomeSection from './Components/WelcomeSection';
import DescriptionSection from './Components/DescriptionSection';
import NyepedaSection from './Components/NyepedaSection';
import Cards from './Components/Cards';
import Footer from './Components/Footer';

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  isMobile: false
		};
	
		this.updatePredicate = this.updatePredicate.bind(this);
	  }
	  componentDidMount() {
		this.updatePredicate();
		window.addEventListener("resize", this.updatePredicate);
	  }
	
	  componentWillUnmount() {
		window.removeEventListener("resize", this.updatePredicate);
	  }
	
	  updatePredicate() {
		this.setState({ isMobile: window.innerWidth < 960 });
	  }
	


	render() {
		const {isMobile} = this.state;
		return (
			<>
			<div>
			<WelcomeSection/>
			<Cards/>
			<NyepedaSection/>
			{isMobile ? <></> : <><br/><br/></>}

			<DescriptionSection/>
			<Footer/>
			</div>
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
