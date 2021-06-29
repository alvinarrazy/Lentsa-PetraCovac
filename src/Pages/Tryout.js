import React, { Fragment } from 'react';
import axios from 'axios';
import MapView from '../Maps/MapView';
import WebMap from '../Maps/WebMap';
import Navbar from './Components/Navbar';
import WelcomeSection from './Components/WelcomeSection';
import DescriptionSection from './Components/DescriptionSection';
import NyepedaSection from './Components/NyepedaSection';
import Cards from './Components/Cards';

class Tryout extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
			desa: [],
			submitted: false
		}
	}

	componentDidMount() {
		axios.get('http://localhost:3001/api/covid/get-desa-in-kecamatan/60db2a49faf1e81950b593b6')
			.then(response => {
				const desa = response.data.semua_desa
				console.log(response.data.semua_desa[0].nama_desa)
				this.setState({
					...this.state,
					desa
				})
			});

		//  axios({
		//  	method: 'get',
		//  	url: 'https://corona.semarangkab.go.id/covid/data_desa',
		//  	desa: "id_kecamatan="+5
		//    });

		// axios.get('https://api.github.com/users/mapbox')
		// .then((response) => {
		//   console.log(response.desa);
		//   console.log(response.status);
		//   console.log(response.statusText);
		//   console.log(response.headers);
		//   console.log(response.config);
		// });
	}

	handleChange(event) {
		const { name, value } = event.target;
		const { desas } = this.state;
		this.setState({
			desas: {
				...desas,
				[name]: value //name dan value component dari <input> tag
			}
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const { desas } = this.state
		console.log(desas)
		axios.post('http://localhost:3001/api/covid/tambah-desa', desas)
	}

	render() {
		const { desas, desa } = this.state

		return (
			<>
				<div className="login-form">
					<h1>Log in</h1>
					<form onSubmit={this.handleSubmit}>
						<input type="text" onChange={this.handleChange} name="nama_desa" value={desas.nama_desa} placeholder="nama_desa" required />
						<input type="text" onChange={this.handleChange} name="nama_kecamatan" value={desas.nama_kecamatan} placeholder="nama_kecamatan" required />
						<input type="text" onChange={this.handleChange} name="suspek" value={desas.suspek} placeholder="suspek" required />
						<input type="text" onChange={this.handleChange} name="discharded" value={desas.discharded} placeholder="discharded" required />
						<input type="text" onChange={this.handleChange} name="meninggal" value={desas.meninggal} placeholder="meninggal" required />
						<input type="text" onChange={this.handleChange} name="konfirmasi_symptomatik" value={desas.konfirmasi_symptomatik} placeholder="konfirmasi_symptomatik" required />
						<input type="text" onChange={this.handleChange} name="konfirmasi_asymptomatik" value={desas.konfirmasi_asymptomatik} placeholder="konfirmasi_asymptomatik" required />
						<input type="text" onChange={this.handleChange} name="konfirmasi_sembuh" value={desas.konfirmasi_sembuh} placeholder="konfirmasi_sembuh" required />
						<input type="text" onChange={this.handleChange} name="konfirmasi_meninggal" value={desas.konfirmasi_meninggal} placeholder="konfirmasi_meninggal" required />
						<input type="submit" value="Log in" />
					</form>
				</div>
				{/* <Navbar/>
			<WelcomeSection/>
			<Cards/>
			<NyepedaSection/>
			<br/>
			<br/>
			<DescriptionSection/> */}
				<table className="data-covid">
					<tr>
						<th>Nama Desa</th>
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
							desa.map(satuDesa => {
								return (
									<tr>
										<th>{satuDesa.nama_desa}</th>
										<th>{satuDesa.nama_kecamatan}</th>
										<th>{satuDesa.suspek}</th>
										<th>{satuDesa.discharded}</th>
										<th>{satuDesa.meninggal}</th>
										<th>{satuDesa.konfirmasi_symptomatik}</th>
										<th>{satuDesa.konfirmasi_asymptomatik}</th>
										<th>{satuDesa.konfirmasi_sembuh}</th>
										<th>{satuDesa.konfirmasi_meninggal}</th>
									</tr>
								)
							})
						}
					</Fragment>
				</table>
				{/* <div dangerouslySetInnerHTML={{ __html: this.state.desa }} /> */}
				{/* <div style={{width:'40%',height: '500px', float: 'left'}}>
					<MapView/>

				</div>
				<div style={{width:'40%',height: '500px', float: 'right'}}>
					<WebMap/>
				</div> */}

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
