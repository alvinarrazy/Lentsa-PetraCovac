import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	addDesaCSV,
	editDataDesa,
	editDataDesaURL
} from '../redux/actions/CovidAction';
import { Button } from './Components/Button';
import { API } from '../config'
import Navbar from './Components/Navbar';
import './Styles/Form.css'
import { RingLoader } from './Components/RingLoader';
import CheckIfAccessAllowed from './Components/CheckIfAccessAllowed';
import Footer from './Components/Footer'

class AdminUpdateDataPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeKecamatan = this.handleChangeKecamatan.bind(this);
		this.handleChangeDesa = this.handleChangeDesa.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLoadURL = this.handleLoadURL.bind(this);
		this.state = {
			desa: {},
			kecamatan: {},
			chosenDesa: {
				nama_desa: '',
				suspek: '',
				discharded: '',
				meninggal: '',
				keterangan: '',
				konfirmasi_asymptomatik: '',
				konfirmasi_symptomatik: '',
				konfirmasi_sembuh: '',
				konfirmasi_meninggal: '',
				keterangan_konfirmasi: ''
			},
			updateData: [],
			dataLoadCount: 0,
			updating: false
		}
	}

	async handleLoadURL() {
		try {
			this.setState({
				updating: true
			})
			for (var i = 1; i < 20; i++) {
				var html = await axios.get(`https://corona.semarangkab.go.id/covid/data_desa?id_kecamatan=${i}`)
				var temp = document.createElement('div');
				temp.innerHTML = html.data;
				var htmlObject = temp.firstChild;
				this.setState({ dataLoadCount: this.state.dataLoadCount + 1 })
				this.exportTableToCSV(htmlObject)
			}
		} catch (error) {
			console.log(error)
		}
	}
	exportTableToCSV(html) {
		var csv = [];
		var rows = html.querySelectorAll("table tr");

		for (var i = 0; i < rows.length; i++) {
			var row = [], cols = rows[i].querySelectorAll("td, th");

			for (var j = 0; j < cols.length; j++)
				row.push(cols[j].innerText);

			csv.push(row.join(";"));
		}
		for (var i = 0; i < csv.length; i++) {
			csv[i] = csv[i].replace(/\t/g, "")
			csv[i] = csv[i].replace(/\n/g, "")
			csv[i] += "\n"
		}
		console.log(csv.join(";"))
		this.fixingHTMLandSend(csv.join(";"))
	}

	fixingHTMLandSend(data) {
		var lines
		lines = data.split("\n");
		lines.splice(0, 1)//hapus Rincian data sebaran di Desa (hapus baris 1)

		lines[0] = lines[0] + ";" + lines[1];//naikin baris 3 ke 2 (sekarang 2 ke 1 setelah splice pertama)
		lines.splice(1, 1)//hapus baris 2

		var firstLine = lines[0].split(";")

		firstLine.splice(3, 3)

		for (var i = 0; i < firstLine.length; i++) {
			firstLine[i] = firstLine[i].replace(" ", "_")
			firstLine[i] = firstLine[i].toLowerCase()
		}
		firstLine[firstLine.length - 1] = "keterangan_konfirmasi"

		lines[0] = ""
		for (var i = 0; i < firstLine.length; i++) {
			lines[0] += firstLine[i]
			if (i === firstLine.length - 1) {

			} else lines[0] += ";"
		}
		for (var i = 0; i < lines.length; i++) {
			lines[i] = lines[i].replace(";", "")
		}
		var result = lines.join('\n')
		console.log(result)
		this.setState({ updateData: [...this.state.updateData, result] })//next masukin ke csvJSON
		if (this.state.dataLoadCount === 19) {
			for (var i = 0; i < this.state.updateData.length; i++) {
				var eachData = this.state.updateData[i]
				var dataArray = this.csvJSON(eachData, ";")
				dataArray.splice(dataArray.length - 1, 1)
				// console.log(i, eachData)
				console.log(dataArray)
				dataArray.map(data => {
					this.props.editDataDesaURL(data)
				})
			}
			this.setState({
				updateData: [],
				dataLoadCount: 0,
				updating: false
			})
		}
	}

	csvJSON(csv, splitter) {

		var lines = csv.split("\n");

		var result = [];
		var headers = lines[0].split(splitter);

		for (var i = 1; i < lines.length; i++) {

			var obj = {};
			var currentline = lines[i].split(splitter);

			for (var j = 0; j < headers.length; j++) {
				obj[headers[j]] = currentline[j];
			}

			result.push(obj);

		}

		return result; //JavaScript object
		//return JSON.stringify(result); //JSON
	}

	handleFile = (e) => {
		const content = e.target.result;
		console.log(this.csvJSON(content, ";"))
		this.props.addDesaCSV(this.csvJSON(content))
		// You can set content in state and show it in render.
	}


	async componentWillMount() {
		try {
			let resultKecamatan = await axios.get(`${API}/covid/get-all-kecamatan`)
			this.setState({
				kecamatan: resultKecamatan.data.semua_kecamatan,
			})
		}
		catch (error) {
			console.log(error.message)
		}

	}

	async handleChangeKecamatan(event) {
		try {
			const { name, value } = event.target;
			let resultDesa = await axios.get(`${API}/covid/get-desa-in-kecamatan/${value}`)
			this.setState({
				desa: resultDesa.data.semua_desa
			});
		} catch (error) {
			console.log(error.message)
		}
	}

	searchDataDesa(nameKey, myArray) {
		for (var i = 0; i < myArray.length; i++) {
			if (myArray[i].nama_desa === nameKey) {
				return myArray[i];
			}
		}
	}

	async handleChangeDesa(event) {
		try {
			const { name, value } = event.target;
			if (value === 'null') {
				this.setState({
					chosenDesa: {
						nama_desa: '',
						suspek: '',
						discharded: '',
						meninggal: '',
						keterangan: '',
						konfirmasi_asymptomatik: '',
						konfirmasi_symptomatik: '',
						konfirmasi_sembuh: '',
						konfirmasi_meninggal: '',
						keterangan_konfirmasi: ''
					},
				});
			}
			else {
				const dataDesa = await this.searchDataDesa(value, this.state.desa)
				this.setState({
					chosenDesa: dataDesa
				});
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	handleChange(event) {
		const { name, value } = event.target;
		const { chosenDesa } = this.state
		this.setState({
			chosenDesa: {
				...chosenDesa,
				[name]: value //name dan value component dari <input> tag
			}
		});
	}


	handleSubmit(event) {
		event.preventDefault();
		const { chosenDesa } = this.state
		this.props.editDataDesaURL(chosenDesa)
	}


	render() {
		const { kecamatan, desa, chosenDesa, updating } = this.state
		var semuaKecamatan, semuaDesa;
		if (kecamatan.length == 19) {
			semuaKecamatan = kecamatan
		} else semuaKecamatan = [{ _id: "none", nama_kecamatan: "Data tidak ditemukan" }]
		if (desa.length >= 1) {
			semuaDesa = desa
		} else semuaDesa = [{ _id: "none", nama_desa: "Data tidak ditemukan" }]
		return (
			<>
				<CheckIfAccessAllowed />
				
				<div className='container'>
					<div className='form-left'>
						<form onSubmit={this.handleSubmit}>
							<div className='row'>
								<div className='col-30'>
									<label>Kecamatan</label>
								</div>
								<div className='col-60'>
									<select onChange={this.handleChangeKecamatan} name='nama_kecamatan' placeholder='Kecamatan' required>
										<option value='null'>Pilih Kecamatan</option>
										<Fragment>
											{
												semuaKecamatan.map(result => {
													return (
														<option value={result._id}>{result.nama_kecamatan}</option>
													)
												})
											}
										</Fragment>
									</select>
								</div>
							</div>
							<div className='row'>
								<div className='col-30'>
									<label>Desa</label>
								</div>
								<div className='col-60'>
									<select onChange={this.handleChangeDesa} name='nama_desa' placeholder='Desa' required>
										<option value='null'>Pilih Desa</option>

										<Fragment>
											{
												semuaDesa.map(result => {
													return (
														<option value={result.nama_desa}>{result.nama_desa}</option>
													)
												})
											}
										</Fragment>
									</select>
								</div>
							</div>
							<div className='row'>
								<div className='col-30'>
									<label>Suspek</label>
								</div>
								<div className='col-60'>
									<input onChange={this.handleChange} type='number' value={chosenDesa.suspek} name='suspek' required />
								</div>
							</div>
							<div className='row'>
								<div className='col-30'>
									<label>Discharded
									</label>
								</div>
								<div className='col-60'>
									<input onChange={this.handleChange} type='number' value={chosenDesa.discharded} name='discharded' required />
								</div>
							</div>
							<div className='row'>
								<div className='col-30'>
									<label>Meninggal
									</label>
								</div>
								<div className='col-60'>
									<input onChange={this.handleChange} type='number' value={chosenDesa.meninggal} name='meninggal' required />
								</div>
							</div>

							<div className='row'>
								<div className='col-30'>
									<label>Konfirmasi Asymptomatik</label>
								</div>
								<div className='col-60'>
									<input onChange={this.handleChange} type='number' value={chosenDesa.konfirmasi_asymptomatik} name='konfirmasi_asymptomatik' required />

								</div>
							</div>
							<div className='row'>
								<div className='col-30'>
									<label>Konfirmasi Symptomatik</label>
								</div>
								<div className='col-60'>
									<input onChange={this.handleChange} type='number' value={chosenDesa.konfirmasi_symptomatik} name='konfirmasi_symptomatik' required />

								</div>
							</div>
							<div className='row'>
								<div className='col-30'>
									<label>Konfirmasi Sembuh</label>
								</div>
								<div className='col-60'>
									<input onChange={this.handleChange} type='number' value={chosenDesa.konfirmasi_sembuh} name='konfirmasi_sembuh' required />

								</div>
							</div>
							<div className='row'>
								<div className='col-30'>
									<label>Konfirmasi Meninggal</label>
								</div>
								<div className='col-60'>
									<input onChange={this.handleChange} type='number' value={chosenDesa.konfirmasi_meninggal} name='konfirmasi_meninggal' required />
								</div>
							</div>
							<div className='row'>
								<div className='col-30'>
									<label>Keterangan</label>
								</div>
								<div className='col-60'>
									<input onChange={this.handleChange} type='text' value={chosenDesa.keterangan} name='keterangan' />
								</div>
							</div>
							<div className='row'>
								<div className='col-100'>
									<input type='submit' value='Submit' />
								</div>
							</div>
						</form>
					</div>
					<div className='form-right'>
						<div>
							<Button buttonSize='btn--large' buttonStyle='btn--primary' onClick={this.handleLoadURL}>Update by URL</Button>
						</div>
						<div className='ring-container' style={{flexDirection:'column', alignItems: 'center', height: '40%' }}>
							{updating ?
								<>
									<p>Please wait while retrieving data</p>
									<RingLoader />

								</> : <></>}
						</div>
					</div>
				</div>
				<Footer />
			</>
		)

	}

}

const mapStateToProps = (state) => {
	return {
		authentication: state.authentication //call by this.props.user.*
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		editDataDesa: (data) => dispatch(editDataDesa(data)),
		editDataDesaURL: (data) => dispatch(editDataDesaURL(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUpdateDataPage);