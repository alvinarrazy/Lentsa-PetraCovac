import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	addDesaCSV,
	editDataDesa,
	editDataDesaURL
} from '../redux/actions/CovidAction';
import { Button } from './Components/Button';
import Navbar from './Components/Navbar';

class UpdateDataPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitFile = this.handleSubmitFile.bind(this);
		this.handleLoadURL = this.handleLoadURL.bind(this)
		this.state = {
			updateData: [],
			dataLoadCount: 0
		}
	}

	async componentDidMount() {

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

	async handleLoadURL() {
		try {
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
		lines.splice(1,1)//hapus baris 2
		
		var firstLine = lines[0].split(";")
		
		firstLine.splice(3,3)
		
		for(var i=0; i<firstLine.length; i++){
			firstLine[i] = firstLine[i].replace(" ", "_")
			firstLine[i] = firstLine[i].toLowerCase()
		}
		firstLine[firstLine.length-1] = "keterangan_konfirmasi"
		
		lines[0]=""
		for (var i = 0; i<firstLine.length; i++){
			lines[0] += firstLine[i]
			if(i===firstLine.length - 1){
		
			}else lines[0] += ";"
		}
		for(var i = 0; i<lines.length; i++){
			lines[i] = lines[i].replace(";", "")
		}
		var result = lines.join('\n')
		console.log(result)
		this.setState({ updateData: [...this.state.updateData, result] })//next masukin ke csvJSON
		if (this.state.dataLoadCount === 19) {
			for(var i = 0; i<this.state.updateData.length;i++){
				var eachData = this.state.updateData[i]
				var dataArray = this.csvJSON(eachData,";")
				dataArray.splice(dataArray.length-1, 1)
				// console.log(i, eachData)
				console.log(dataArray)
				dataArray.map(data => {
					this.props.editDataDesaURL(data)
				})
			}
			this.setState({
				updateData: [],
				dataLoadCount: 0
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
				<Navbar />

				<Button onClick={this.handleLoadURL}>Update by URL</Button>

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
		addDesaCSV: (jsonData) => dispatch(addDesaCSV(jsonData)),
		editDataDesa: (data) => dispatch(editDataDesa(data)),
		editDataDesaURL: (data) => dispatch(editDataDesaURL(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDataPage);