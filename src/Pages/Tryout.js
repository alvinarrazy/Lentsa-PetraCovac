import React from 'react';
import axios from 'axios';
import MapView from '../Maps/MapView';
import WebMap from '../Maps/WebMap';
import Navbar from './Components/Navbar';

class Tryout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: []
		}
	}

	componentDidMount() {
		axios.get('https://corona.semarangkab.go.id/covid/data_desa?id_kecamatan=5')
		.then(response => {
			const data = response.data
			this.setState({data})
		});

		// axios({
		// 	method: 'get',
		// 	url: 'https://corona.semarangkab.go.id/covid/data_desa',
		// 	data: "id_kecamatan="+5
		//   });	

		// axios.get('https://api.github.com/users/mapbox')
		// .then((response) => {
		//   console.log(response.data);
		//   console.log(response.status);
		//   console.log(response.statusText);
		//   console.log(response.headers);
		//   console.log(response.config);
		// });
	  }

	render() {
		return (
			<>
			<Navbar/>
			<div dangerouslySetInnerHTML={{ __html: this.state.data }} />
				<div style={{width:'40%',height: '500px', float: 'left'}}>
					{/* <MapView/> */}

				</div>
				<div style={{width:'40%',height: '500px', float: 'right'}}>
					{/* <WebMap/> */}
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

export default Tryout;
