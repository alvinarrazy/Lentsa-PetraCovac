import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './Styles/FilesReportForm.css'
import { RingLoader } from './Components/RingLoader';
import CheckIfAccessAllowed from './Components/CheckIfAccessAllowed';
import Footer from './Components/Footer'
import { filesReport } from '../redux/actions/ReportAction';
class FilesReportPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onFileChange = this.onFileChange.bind(this);
		this.state = {
			report: {
				nik_pelapor: '',
				nama_pelapor: '',
				laporan: '',
				keterangan: '',
				photo: null
			},
			isLoading: true
		}
	}

	handleDoneLoad() {
		this.setState({
			isLoading: false
		})
	}


	componentWillMount() {
		let user = JSON.parse(localStorage.getItem('profile'))
		const { report } = this.state
		this.setState({
			report: {
				...report,
				nik_pelapor: user.nomorIndukKependudukan,
				nama_pelapor: user.namaPanjang,
			}
		}, this.handleDoneLoad())
	}

	handleChange(event) {
		const { name, value } = event.target;
		const { report } = this.state
		this.setState({
			report: {
				...report,
				[name]: value //name dan value component dari <input> tag
			}
		});
	}

	onFileChange(event) {
		const { report } = this.state;

		// Update the state 
		this.setState({
			report: {
				...report,
				photo: event.target.files[0]
			}
		});
	};

	handleSubmit(event) {
		event.preventDefault();
		let user = JSON.parse(localStorage.getItem('profile'))
		const { report } = this.state
		const formdata = new FormData();
		if (report.photo && report.nik_pelapor && report.nama_pelapor && report.keterangan && report.laporan) {
			formdata.append('nik_pelapor', report.nik_pelapor)
			formdata.append('nama_pelapor', report.nama_pelapor)
			formdata.append('keterangan', report.keterangan)
			formdata.append('laporan', report.laporan)
			formdata.append('photo', report.photo, report.photo.name)
			this.props.filesReport(formdata, user.token)
		} else {
			alert('isi data dengan benar!')
		}
		// console.log(report)
		// this.props.filesReport(report)
	}


	render() {
		const { report, isLoading } = this.state
		const { reportReducer } = this.props
		if (isLoading) {
			return (
				<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', height: '70vh', justifyContent: 'center' }}>
					<p>Please wait while retrieving data</p>
					<RingLoader />
				</div>
			)
		}
		else return (
			<>
				<CheckIfAccessAllowed />
				<div className='container'>

					<div className='form-left'>
						<form onSubmit={this.handleSubmit}>
							<div className='column-form'>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>NIK</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={report.nik_pelapor} name='nik_pelapor' readOnly />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Nama
										</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={report.nama_pelapor} name='nama_pelapor' readOnly />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Laporan
										</label>
									</div>
									<div className='col-row-form'>
										<select onChange={this.handleChange} name='laporan' placeholder='Laporan' required>
											<option value={null}>Pilih jenis laporan</option>
											<option value='Gejala'>Gejala</option>
											<option value='Positif'>Positif</option>
											<option value='Sudah Sembuh'>Sudah Sembuh</option>
											<option value='Sudah Vaksin 1 kali'>Sudah Vaksin 1 kali</option>
											<option value='Sudah Vaksin 2 kali'>Sudah Vaksin 2 kali</option>
										</select>
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Keterangan</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={report.keterangan} name='keterangan' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Bukti</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.onFileChange} type='file' name='photo' />
									</div>
								</div>
								<div className='col-80'>
									<input type='submit' value='Submit' />
								</div>
							</div>
						</form>
					</div>
					<div className='form-right'>
						<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', height: '40%' }}>
							{reportReducer.isReporting ?
								<>
									<p>Please wait while submitting data</p>
									<RingLoader />

								</> : <></>
							}
							{reportReducer.reportSuccess ?
								<>
									<p>Laporan telah diterima dan akan segera diproses</p>

								</> : <></>
							}
							{reportReducer.reportFails ?
								<>
									<p style={{ color: 'red' }}>Laporan gagal diproses!</p>

								</> : <></>
							}
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
		authentication: state.authentication,
		reportReducer: state.reportReducer //call by this.props.user.*
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		filesReport: (data, token) => dispatch(filesReport(data, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesReportPage);