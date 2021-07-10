import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	getAllKecamatan,
	addDesaCSV,
	getDesaInURL,
	editDataDesa,
	editDataDesaURL
} from '../redux/actions/CovidAction';


class UpdateDataPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitFile = this.handleSubmitFile.bind(this);
		this.state = {
			desa: {
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
			submitted: false
		}
	}

	async componentDidMount() {
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
		const { desa } = this.state;
		this.setState({
			desa: {
				...desa,
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

	handleSubmitFile = (file) => {
		let fileData = new FileReader();
		fileData.onloadend = this.handleFile;
		fileData.readAsText(file);
	}


	handleSubmit(event) {
		event.preventDefault();
		const { desa } = this.state
		this.props.editDataDesa(desa)
	}

	render() {
		const { desa } = this.state
		return (
			<>
				<div className="">
					<form onSubmit={this.handleSubmit}>
						<input type="text" onChange={this.handleChange} name="nama_desa" value={desa.nama_desa} placeholder="nama_desa" required />
						<input type="text" onChange={this.handleChange} name="suspek" value={desa.suspek} placeholder="suspek" required />
						<input type="text" onChange={this.handleChange} name="discharded" value={desa.discharded} placeholder="discharded" required />
						<input type="text" onChange={this.handleChange} name="meninggal" value={desa.meninggal} placeholder="meninggal" required />
						<input type="text" onChange={this.handleChange} name="konfirmasi_symptomatik" value={desa.konfirmasi_symptomatik} placeholder="konfirmasi_symptomatik" required />
						<input type="text" onChange={this.handleChange} name="konfirmasi_asymptomatik" value={desa.konfirmasi_asymptomatik} placeholder="konfirmasi_asymptomatik" required />
						<input type="text" onChange={this.handleChange} name="konfirmasi_sembuh" value={desa.konfirmasi_sembuh} placeholder="konfirmasi_sembuh" required />
						<input type="text" onChange={this.handleChange} name="konfirmasi_meninggal" value={desa.konfirmasi_meninggal} placeholder="konfirmasi_meninggal" required />
						<input type="submit" value="Update" />
					</form>
				</div>
				<form onSubmit={e => { this.handleSubmitFile(e.target.files[0]) }}>
					<input type="file" onChange={e => { this.handleSubmitFile(e.target.files[0]) }} />
					<input type="submit" value="Update"/>
				</form>
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
		getDesaInURL: (id_desa) => dispatch(getDesaInURL(id_desa)),
		editDataDesa: (data) => dispatch(editDataDesa(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDataPage);
