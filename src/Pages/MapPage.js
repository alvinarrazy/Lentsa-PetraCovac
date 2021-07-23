import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import MapView from '../Maps/MapView'
import WebMap from '../Maps/WebMap'
import Navbar from './Components/Navbar';


class MapPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}


	render() {
		return (
			<>
				
				<div style={{display: "flex", alignItems: "center", justifyContent: "center" }}>
					
					<div style={
						{ width: '40%', height: '500px' ,display: "flex", alignItems: "center", justifyContent: "center"}
						}>
					<WebMap/>
					</div>

				</div>
			</>
		)

	}

}

const mapStateToProps = (state) => {
	return {
		covidDataState: state.covidDataReducer //call by this.props.covidDataState.*
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
