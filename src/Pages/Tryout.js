import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	getAllKecamatan,
	addDesaCSV,
	getDesaInURL
} from '../redux/actions/CovidAction';


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

	async componentDidMount() {
		this.props.getAllKecamatan();
		try {
			var html = await axios.get("https://corona.semarangkab.go.id/covid/data_desa?id_kecamatan=5")
			var temp = document.createElement('div');
			temp.innerHTML = html.data;
			var htmlObject = temp.firstChild;
			this.exportTableToCSV(htmlObject)
			console.log(htmlObject)
		} catch (error) {
			console.log(error)
		}

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

	exportTableToCSV(html) {
		var csv = [];
		var rows = html.querySelectorAll("table tr");

		for (var i = 0; i < rows.length; i++) {
			var row = [], cols = rows[i].querySelectorAll("td, th");

			for (var j = 0; j < cols.length; j++)
				row.push(cols[j].innerText);

			csv.push(row.join(","));
		}
		for(var i = 0; i<csv.length;i++){
			csv[i] = csv[i].replace(/\t/g, "")
			csv[i] = csv[i].replace(/\n/g, "")
			csv[i] += "\n"
		}
		this.fixingHTML(csv.toString())
	}

	fixingHTML(data) {
		var lines
		lines = data.split("\n");
		lines.splice(0, 1)
		
		lines[0] = lines[0] + "," + lines[1];
		lines.splice(1,1)
		
		var firstLine = lines[0].split(",")
		
		firstLine.splice(2,2)
		lines[0]=""
		for (var i = 0; i<firstLine.length; i++){
			lines[0] += firstLine[i]
			if(i===firstLine.length - 1){
		
			}else lines[0] += ","
		}
		for(var i = 0; i<lines.length; i++){
			lines[i] = lines[i].replace(",", "")
		}
		var result = lines.join("\n")
		return result//next masukin ke csvJSON
	}

	csvJSON(csv) {

		var lines = csv.split("\n");

		var result = [];
		var headers = lines[0].split(";");

		for (var i = 1; i < lines.length; i++) {

			var obj = {};
			var currentline = lines[i].split(";");

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
		console.log(this.csvJSON(content))
		this.props.addDesaCSV(this.csvJSON(content))
		// You can set content in state and show it in render.
	}

	handleChangeFile = (file) => {
		let fileData = new FileReader();
		fileData.onloadend = this.handleFile;
		fileData.readAsText(file);
	}


	handleSubmit(event) {
		event.preventDefault();
		const { desas } = this.state
		console.log(desas)
		axios.post('http://localhost:3002/api/covid/tambah-desa', desas)
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
				{/* <table className="data-covid">
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
				</table> */}

				<input type="file" onChange={e => { this.handleChangeFile(e.target.files[0]) }} />
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

const mapStateToProps = (state) => {
	return {
		covidDataState: state.covidDataReducer //call by this.props.covidDataState.*
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllKecamatan: () => dispatch(getAllKecamatan()),
		addDesaCSV: (jsonData) => dispatch(addDesaCSV(jsonData)),
		getDesaInURL: (id_desa) => dispatch(getDesaInURL(id_desa))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tryout);
