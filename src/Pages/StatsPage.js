import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	getAllKecamatan,
	getSumDataKecamatan
} from '../redux/actions/CovidAction';
import './Styles/Table.css'
import Navbar from './Components/Navbar';


class StatsPage extends React.Component {
	constructor(props) {
		super(props);
		this.props.getAllKecamatan();

		this.state = {
			desas: {
				nama_desa: '',
				nama_kecamatan: '',
				suspek: '',
				discharded: '',
				meninggal: '',
				konfirmasi_symptomatik: '',
				konfirmasi_asymptomatik: '',
				konfirmasi_sembuh: '',
				konfirmasi_meninggal: '',
			},
			kecamatan: [],
			submitted: false
		}
	}

	async componentWillMount() {
		try {
			let resultKecamatan = await axios.get(`http://localhost:3002/api/covid/get-all-kecamatan`)
			var resultSum
			console.log(resultKecamatan)
			resultKecamatan.data.semua_kecamatan.map(async (kecamatan) =>{
				resultSum = await axios.get(`http://localhost:3002/api/covid/get-sum-data-kecamatan/${kecamatan._id}`)
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
		console.log(kecamatan)
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
										<td>{satuKecamatan.nama_kecamatan}</td>
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
		getAllKecamatan: () => dispatch(getAllKecamatan()),
		getSumDataKecamatan: (idKecamatan) => dispatch(getSumDataKecamatan(idKecamatan)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
