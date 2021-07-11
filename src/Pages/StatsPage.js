import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {
	getAllKecamatan,
	getSumDataKecamatan
} from '../redux/actions/CovidAction';
import './Styles/Table.css'
import Navbar from './Components/Navbar';
import {API} from '../config';

class StatsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			kecamatan: [],
			submitted: false
		}
	}

	async componentWillMount() {
		try {
			let resultKecamatan = await axios.get(`${API}/covid/get-all-kecamatan`)
			var resultSum
			resultKecamatan.data.semua_kecamatan.map(async (kecamatan) =>{
				resultSum = await axios.get(`${API}/covid/get-sum-data-kecamatan/${kecamatan._id}`)
				console.log(resultSum)
				this.setState({
					kecamatan: [...this.state.kecamatan, resultSum.data]
				})
		   })
		}
		catch (error) {
			console.log(error)
		}

	}


	render() {
		const { kecamatan } = this.state
		return (
			<>
			<Navbar/>
				<table className="data-kecamatan">
					<tr>
						<td>Nama Kecamatan</td>
						<td>Suspek</td>
						<td>Discharded</td>
						<td>Meninggal</td>
						<td>Konfirmasi Symptomatik</td>
						<td>Konfirmasi Asymptomatik</td>
						<td>Konfirmasi Sembuh</td>
						<td>Konfirmasi Meninggal</td>
					</tr>
					<Fragment>
						{
							kecamatan.map(satuKecamatan => {
								return (
									<tr>
										<td><Link to='#'>{satuKecamatan.nama_kecamatan}</Link></td>
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
