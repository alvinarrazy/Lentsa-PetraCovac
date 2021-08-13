import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Styles/Table.css'
import { API } from '../config';
import { RingLoader } from './Components/RingLoader';
import Footer from './Components/Footer'

class StatsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			kecamatan: [],
			isLoaded: false
		}
	}

	async componentWillMount() {
		try {
			let resultKecamatan = await axios.get(`${API}/covid/get-all-kecamatan`)
			var resultSum
			Promise.all(resultKecamatan.data.semua_kecamatan.map(async (kecamatan) => {
				resultSum = await axios.get(`${API}/covid/get-sum-data-kecamatan/${kecamatan._id}`)
				console.log(resultSum)
				this.setState({
					kecamatan: [...this.state.kecamatan, resultSum.data]
				})
			})).then(() => {
				this.setState({ isLoaded: true });
				console.log(this.state.isLoaded)
			})
		}
		catch (error) {
			console.log(error)
		}

	}


	render() {
		const { kecamatan, isLoaded } = this.state
		return (
			<>

				{isLoaded ? <>
					<div className='table-wrap'>
						<table className="data-kecamatan">
							<tr>
								<th>Nama Kecamatan</th>
								<th>Suspek</th>
								<th>Discharded</th>
								<th>Meninggal</th>
								<th>Konfirmasi Symptomatik</th>
								<th>Konfirmasi Asymptomatik</th>
								<th>Konfirmasi Sembuh</th>
								<th>Konfirmasi Meninggal</th>
							</tr>
							<Fragment>
								{
									kecamatan.map(satuKecamatan => {
										return (
											<tr>
												<td><Link to={`/stats-data/data-desa/:?${satuKecamatan.id_kecamatan}`}>{satuKecamatan.nama_kecamatan}</Link></td>
												<td>{satuKecamatan.suspek}</td>
												<td>{satuKecamatan.discharded}</td>
												<td>{satuKecamatan.meninggal}</td>
												<td>{satuKecamatan.konfirmasi_symptomatik}</td>
												<td>{satuKecamatan.konfirmasi_asymptomatik}</td>
												<td>{satuKecamatan.konfirmasi_sembuh}</td>
												<td>{satuKecamatan.konfirmasi_meninggal}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
