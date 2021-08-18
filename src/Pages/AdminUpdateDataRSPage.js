import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	addDataRS,
	editDataRS
} from '../redux/actions/DataRSAction';
import { API } from '../config'
import './Styles/Form.css'
import { RingLoader } from './Components/RingLoader';
import CheckIfAccessAllowed from './Components/CheckIfAccessAllowed';
import Footer from './Components/Footer'

class AdminUpdateDataRSPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeRS = this.handleChangeRS.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCheckBox = this.handleCheckBox.bind(this)
		this.state = {
			getData: null,
			dataRS: {
				_id: '',
				nama_rumahSakit: '',
				jumlahKamarUmum: '',
				jumlahKamarCovid: '',
				jumlahNakes: '',
				kelas: ''
			},
			isAdding: false,
			reducerState: {
				isUpdating: false,
				updatingSuccess: false,
				updatingFails: false,
				updatedData: {}
			}
		}
	}


	componentDidUpdate(prevProps) {
		if (prevProps.dataRSReducer !== this.props.dataRSReducer) {
			this.setState({ reducerState: this.props.dataRSReducer });
		}
	}

	async componentWillMount() {
		try {
			let resultRS = await axios.get(`${API}/data-rs/get-data/`)
			console.log(resultRS)
			this.setState({
				getData: resultRS.data,
			})
		}
		catch (error) {
			console.log(error.message)
		}
	}

	handleCheckBox() {
		this.setState({
			isAdding: !this.state.isAdding,
			dataRS: {
				_id: '',
				nama_rumahSakit: '',
				jumlahKamarUmum: '',
				jumlahKamarCovid: '',
				jumlahNakes: '',
				kelas: ''
			}
		});
	}

	searchDataDesa(nameKey, myArray) {
		for (var i = 0; i < myArray.length; i++) {
			if (myArray[i]._id === nameKey) {
				return myArray[i];
			}
		}
	}

	async handleChangeRS(event) {
		try {
			var index = event.nativeEvent.target.selectedIndex;
			const { value, text } = event.nativeEvent.target[index];
			console.log(event.nativeEvent.target[index])
			console.log(value, text)
			if (value === null) {
				this.setState({
					dataRS: {
						_id: '',
						nama_rumahSakit: '',
						jumlahKamarUmum: '',
						jumlahKamarCovid: '',
						jumlahNakes: '',
						kelas: ''
					}
				});
			}
			else {
				const dataRS = await this.searchDataDesa(value, this.state.getData)
				this.setState({
					dataRS: dataRS
				});
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	handleChange(event) {
		const { name, value} = event.target;
		const { dataRS } = this.state
		this.setState({
			dataRS: {
				...dataRS,
				[name]: value
			}
		});
	}


	handleSubmit(event) {
		event.preventDefault();
		const { dataRS } = this.state
		if(this.state.isAdding){
			this.props.addDataRS(dataRS)
		}else{
			this.props.editDataRS(dataRS)
		}
	}


	render() {
		const { dataRS, reducerState, getData } = this.state
		return (
			<>
				<CheckIfAccessAllowed />
				<div className='container'>
					<form onSubmit={this.handleSubmit}>
						<div className='checkbox'>
							<input defaultChecked={this.state.isAdding} onChange={this.handleCheckBox} type='checkbox' />
							<label style={{ marginLeft: '10px' }}>Tambah Data Baru</label>
						</div>
						<div className='form-left'>
							<div className='column-form'>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Nama Rumah Sakit</label>
									</div>
									<div className='col-row-form'>
										{this.state.isAdding ?
											<div className='row-form'>
												<div className='col-row-form'>
													<input onChange={this.handleChange} type='text' value={dataRS.nama_rumahSakit} name='nama_rumahSakit' required />
												</div>
											</div>
											:
											<select style={{ width: '200px' }} onChange={this.handleChangeRS} placeholder='Rumah Sakit' required>
												<option value={null}>Pilih Rumah Sakit</option>
												<Fragment>
													{getData ?
														getData.map(result => {
															return (
																<option value={result._id}>{result.nama_rumahSakit}</option>
															)
														})
														:
														<option value={null}>Data rumah sakit tidak ditemukan</option>

													}
												</Fragment>
											</select>
										}
									</div>
								</div>
							</div>
							<div className='column-form'>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Jumlah Kamar Umum</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='number' value={dataRS.jumlahKamarUmum} name='jumlahKamarUmum' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Jumlah Kamar Covid-19
										</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='number' value={dataRS.jumlahKamarCovid} name='jumlahKamarCovid' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Jumlah Tenaga Kerja
										</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='number' value={dataRS.jumlahNakes} name='jumlahNakes' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Kelas</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={dataRS.kelas} name='kelas' required />
									</div>
								</div>
							</div>
						</div>
						<div style={{ width: '80%' }} className='col-80'>
							<input type='submit' />
						</div>
					</form>
					<div className='form-right'>
						{/* <div>
							<Button buttonSize='btn--large' buttonStyle='btn--primary' onClick={this.handleLoadURL}>Update by URL</Button>
						</div> */}
						<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', height: '40%' }}>
							{reducerState.isUpdating ?
								<>
									<p>Please wait while submitting data</p>
									<RingLoader />

								</> : <></>}
							{reducerState.updatingFails ?
								<>
									<p style={{ color: 'red', textAlign: 'center' }}>Updating gagal, tolong pastikan Nama Rumah Sakit tidak sama atau coba lagi nanti</p>

								</> : <></>}
							{reducerState.updatingSuccess ?
								<>
									<p>Updating Success</p>

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
		dataRSReducer: state.dataRSReducer //call by this.props.user.*
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addDataRS: (data) => dispatch(addDataRS(data)),
		editDataRS: (data) => dispatch(editDataRS(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUpdateDataRSPage);