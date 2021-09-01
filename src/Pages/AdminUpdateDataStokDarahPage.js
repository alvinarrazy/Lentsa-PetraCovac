import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	addDataStok,
	editDataStok
} from '../redux/actions/StokDarahAction';
import { API } from '../config'
import './Styles/Form.css'
import { RingLoader } from './Components/RingLoader';
import CheckIfAccessAllowed from './Components/CheckIfAccessAllowed';
import Footer from './Components/Footer'

class AdminUpdateDataStokDarahPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeStok = this.handleChangeStok.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCheckBox = this.handleCheckBox.bind(this)
		this.state = {
			getData: null,
			dataStok: {
				_id: '',
				stokDarah: '',
				golonganA: '',
				golonganB: '',
				golonganO: '',
				golonganAB: ''
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
		if (prevProps.stokDarahReducer !== this.props.stokDarahReducer) {
			this.setState({ reducerState: this.props.stokDarahReducer });
		}
	}

	async componentWillMount() {
		try {
			let resultStok = await axios.get(`${API}/stok-darah/get-all`)
			this.setState({
				getData: resultStok.data,
			})
		}
		catch (error) {
			console.log(error.message)
		}
	}

	handleCheckBox() {
		this.setState({
			isAdding: !this.state.isAdding,
			dataStok: {
				_id: '',
				stokDarah: '',
				golonganA: '',
				golonganB: '',
				golonganO: '',
				golonganAB: ''
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

	async handleChangeStok(event) {
		try {
			var index = event.nativeEvent.target.selectedIndex;
			const { value, text } = event.nativeEvent.target[index];
			// console.log(event.nativeEvent.target[index])
			// console.log(value, text)
			if (value === null) {
				this.setState({
					dataStok: {
						_id: '',
						stokDarah: '',
						golonganA: '',
						golonganB: '',
						golonganO: '',
						golonganAB: ''
					}
				});
			}
			else {
				const dataStok = await this.searchDataDesa(value, this.state.getData)
				this.setState({
					dataStok: dataStok
				});
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	handleChange(event) {
		const { name, value } = event.target;
		const { dataStok } = this.state
		this.setState({
			dataStok: {
				...dataStok,
				[name]: value
			}
		});
	}


	handleSubmit(event) {
		event.preventDefault();
		const { dataStok } = this.state
		if (this.state.isAdding) {
			this.props.addDataStok(dataStok)
		} else {
			this.props.editDataStok(dataStok)
		}
	}


	render() {
		const { dataStok, reducerState, getData } = this.state
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
										<label>Jenis Stok Darah</label>
									</div>
									<div className='col-row-form'>
										{this.state.isAdding ?
											<div className='row-form'>
												<div className='col-row-form'>
													<input onChange={this.handleChange} type='text' value={dataStok.stokDarah} name='stokDarah' required />
												</div>
											</div>
											:
											<select style={{ width: '200px' }} onChange={this.handleChangeStok} placeholder='Rumah Sakit' required>
												<option value={null}>Pilih Jenis Stok</option>
												<Fragment>
													{getData ?
														getData.map(result => {
															return (
																<option value={result._id}>{result.stokDarah}</option>
															)
														})
														:
														<option value={null}>Data stok darah tidak ditemukan</option>

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
										<label>Golongan A</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='number' value={dataStok.golonganA} name='golonganA' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Golongan B
										</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='number' value={dataStok.golonganB} name='golonganB' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Golongan O
										</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='number' value={dataStok.golonganO} name='golonganO' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Golongan AB</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='number' value={dataStok.golonganAB} name='golonganAB' required />
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
		stokDarahReducer: state.stokDarahReducer //call by this.props.user.*
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addDataStok: (data) => dispatch(addDataStok(data)),
		editDataStok: (data) => dispatch(editDataStok(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUpdateDataStokDarahPage);