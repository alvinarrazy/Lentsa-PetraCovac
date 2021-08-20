import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Styles/Table.css'
import { API } from '../config';
import { RingLoader } from './Components/RingLoader';
import Footer from './Components/Footer'

class RSStatsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rumahSakit: [],
			isLoaded: false
		}
	}

	async componentWillMount() {
		try {
			let resultRS = await axios.get(`${API}/data-rs/get-data`)
			if(resultRS){
				this.setState({
					rumahSakit: resultRS.data,
					isLoaded: true
				})
			}
		}
		catch (error) {
			console.log(error)
		}

	}


	render() {
		const { rumahSakit, isLoaded } = this.state
		return (
			<>

				{isLoaded ? <>
					<div className='table-wrap'>
						<table className="data-kecamatan">
							<tr>
								<th>Nama Rumah Sakit</th>
								<th>Jumlah Kamar Umum</th>
								<th>Jumlah Kamar Covid</th>
								<th>Jumlah Nakes</th>
								<th>Kelas</th>
							</tr>
							<Fragment>
								{
									rumahSakit.map(satuRS => {
										return (
											<tr>
												<td>{satuRS.nama_rumahSakit}</td>
												<td>{satuRS.jumlahKamarUmum}</td>
												<td>{satuRS.jumlahKamarCovid}</td>
												<td>{satuRS.jumlahNakes}</td>
												<td>{satuRS.kelas}</td>
											</tr>
										)
									})
								}
							</Fragment>
						</table>
					</div>
					<Footer />
				</>
					:
					<>
						<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', height: '85vh', width: '100%' }}>
							<p>Please wait while retrieving data</p>
							<RingLoader />
						</div>
					</>}
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

export default connect(mapStateToProps, mapDispatchToProps)(RSStatsPage);
