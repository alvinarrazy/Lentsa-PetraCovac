import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router';
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
			namaKecamatan: "",
			desa: []
		}
	}

	async componentWillMount() {
		try {
			
			const idKecamatan = window.location.search.replace('?', '');
			let resultDesa = await axios.get(`${API}/covid/get-desa-in-kecamatan/${idKecamatan}`)
			this.setState({
				desa: resultDesa.data.semua_desa,
				namaKecamatan: resultDesa.data.semua_desa[0].nama_kecamatan
			})
		}
		catch (error) {
			console.log(error.message)
		}

	}


	render() {
		const { desa,namaKecamatan } = this.state
		return (
			<>
			<Navbar src={window.location.origin + "/images/lentsa.png"}/>
				<h1>{namaKecamatan}</h1>
				<table className="data-kecamatan">
					<tr>
						<td>Nama Desa</td>
						<td>Suspek</td>
						<td>Discharded</td>
						<td>Meninggal</td>
						<td>Keterangan</td>
						<td>Konfirmasi Symptomatik</td>
						<td>Konfirmasi Asymptomatik</td>
						<td>Konfirmasi Sembuh</td>
						<td>Konfirmasi Meninggal</td>
						<td>Keterangan</td>
					</tr>
					<Fragment>
						{
							desa.map(satuDesa => {
								return (
									<tr>
										<td>{satuDesa.nama_desa}</td>
										<td>{satuDesa.suspek}</td>
										<td>{satuDesa.discharded}</td>
										<td>{satuDesa.meninggal}</td>
										<td>{satuDesa.keterangan}</td>
										<td>{satuDesa.konfirmasi_symptomatik}</td>
										<td>{satuDesa.konfirmasi_asymptomatik}</td>
										<td>{satuDesa.konfirmasi_sembuh}</td>
										<td>{satuDesa.konfirmasi_meninggal}</td>
										<td>{satuDesa.keterangan_konfirmasi}</td>
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
