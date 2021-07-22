import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import {
	getAllKecamatan,
	getSumDataKecamatan
} from '../redux/actions/CovidAction';
import './Styles/Table.css'
import Navbar from './Components/Navbar';
import { API } from '../config';
import Footer from './Components/Footer';
class StatsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			namaKecamatan: "",
			desa: [],
			isLoaded: false
		}
	}

	async componentWillMount() {
		try {

			const idKecamatan = window.location.search.replace('?', '');
			let resultDesa = await axios.get(`${API}/covid/get-desa-in-kecamatan/${idKecamatan}`)
			this.setState({
				desa: resultDesa.data.semua_desa,
				namaKecamatan: resultDesa.data.semua_desa[0].nama_kecamatan,
				isLoaded: true
			})
		}
		catch (error) {
			console.log(error.message)
		}

	}


	render() {
		const { desa, namaKecamatan, isLoaded } = this.state
		return (
			<>
				<Navbar src={window.location.origin + "/images/lentsa.png"} />
				{isLoaded ? <>
					<h1>{namaKecamatan}</h1>
					<table className="data-kecamatan" style={{ tableLayout: 'fixed' }}>
						<tr>
							<th>Nama Desa</th>
							<th>Suspek</th>
							<th>Discharded</th>
							<th>Meninggal</th>
							<th>Konfirmasi Symptomatik</th>
							<th>Konfirmasi Asymptomatik</th>
							<th>Konfirmasi Sembuh</th>
							<th>Konfirmasi Meninggal</th>
							<th>Keterangan</th>
						</tr>
						<Fragment>
							{
								desa.map(satuDesa => {
									return (
										<tr>
											<td>{satuDesa.nama_desa}</td>
											<td className='number-data'>{satuDesa.suspek}</td>
											<td className='number-data'>{satuDesa.discharded}</td>
											<td className='number-data'>{satuDesa.meninggal}</td>
											<td className='number-data'>{satuDesa.konfirmasi_symptomatik}</td>
											<td className='number-data'>{satuDesa.konfirmasi_asymptomatik}</td>
											<td className='number-data'>{satuDesa.konfirmasi_sembuh}</td>
											<td className='number-data'>{satuDesa.konfirmasi_meninggal}</td>
											<td>{satuDesa.keterangan}</td>
										</tr>
									)
								})
							}
						</Fragment>
					</table>
					<Footer />
				</> : <></>}
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
