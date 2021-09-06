/* eslint-disable default-case */
import React, { Fragment } from 'react';
import ConsoleHelper from '../redux/helpers/ConsoleHelper';
import { connect } from 'react-redux';
import axios from 'axios';
import CheckIfAccessAllowed from './Components/CheckIfAccessAllowed';
import { Button } from './Components/Button';
import { confirmReport, deleteReport } from '../redux/actions/ReportAction';
import NewReportItem from './Components/NewReportItem';
import './Styles/CardTable.css';
import { API } from '../config';
import { RingLoader } from './Components/RingLoader';

class AdminCovidReportsPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updatePredicate = this.updatePredicate.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.state = {
			reports: '',
			isLoading: false,
			isMobile: false,
			reducerState: {
				isReporting: false,
				isConfirming: false,
				errorDetails: '',
				reportFails: false,
				isDeleting: false,
				deleteSuccess: false,
				confirmSuccess: false,
				deletingFails: false,
				confirmFails: false
			}
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.reportReducer !== this.props.reportReducer) {
			this.setState({ reducerState: this.props.reportReducer });
		}
	}

	componentDidMount() {
		this.updatePredicate();
		window.addEventListener("resize", this.updatePredicate);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updatePredicate);
	}

	updatePredicate() {
		this.setState({ isMobile: window.innerWidth < 960 });
	}

	async componentWillMount() {
		try {
			let reports = await axios.get(`${API}/report/get-all-reports`)
			ConsoleHelper(reports)
			this.setState({
				reports: reports.data.posts
			})
		} catch (error) {
			ConsoleHelper(error.message)
		}
	}


	handleConfirm(id) {
		this.props.confirmReport(id)
		window.location.reload()
	}

	handleDelete(id) {
		this.props.deleteReport(id)
		window.location.reload()
	}

	handleFile = (e) => {
		const content = e.target.result;
		this.props.addDesaCSV(this.csvJSON(content))
		// You can set content in state and show it in render.
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


	handleSubmit(event) {
		event.preventDefault();
		const { report } = this.state
		this.props.filesReport(report)
	}


	render() {
		const { reports, isMobile, reducerState } = this.state
		if (isMobile) {
			return (
				<>
					<div className='ring-container' style={{ textAlign: 'center', flexDirection: 'column', alignItems: 'center', height: '70vh', justifyContent: 'center' }}>
						<p>Tidak dapat menampilkan dalam mode mobile, gunakan desktop</p>
					</div>
				</>
			)
		}
		else if (reports && reports.length !== 0) {
			return (
				<>
					<CheckIfAccessAllowed />
					<h1 style={{ marginTop: '12px' }}>Laporan Covid-19 Kab. Semarang</h1>
					<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', height: '40%' }}>
						{reducerState.confirmFails ?
							<>
								<p style={{ color: 'red' }}>Terjadi kesalahan saat mengonfirmasi, coba lagi nanti atau kontak administrator</p>
							</> : <></>}
						{reducerState.deletingFails ?
							<>
								<p style={{ color: 'red' }}>Terjadi kesalahan saat menghapus, coba lagi nanti atau kontak administrator</p>
							</> : <></>}
					</div>
					<div className='grid-container'>
						<Fragment>
							{
								reports.map(report => {
									let date = new Date(report.postedDate)
									var tahun = date.getFullYear();
									var bulan = date.getMonth();
									var tanggal = date.getDate();
									var hari = date.getDay();
									var jam = date.getHours();
									var menit = date.getMinutes();
									var detik = date.getSeconds();
									switch (hari) {
										case 0: hari = "Minggu"; break;
										case 1: hari = "Senin"; break;
										case 2: hari = "Selasa"; break;
										case 3: hari = "Rabu"; break;
										case 4: hari = "Kamis"; break;
										case 5: hari = "Jum'at"; break;
										case 6: hari = "Sabtu"; break;
									}
									switch (bulan) {
										case 0: bulan = "Januari"; break;
										case 1: bulan = "Februari"; break;
										case 2: bulan = "Maret"; break;
										case 3: bulan = "April"; break;
										case 4: bulan = "Mei"; break;
										case 5: bulan = "Juni"; break;
										case 6: bulan = "Juli"; break;
										case 7: bulan = "Agustus"; break;
										case 8: bulan = "September"; break;
										case 9: bulan = "Oktober"; break;
										case 10: bulan = "November"; break;
										case 11: bulan = "Desember"; break;
									}
									{/* let waktu = date.getTime() */ }
									return (
										<>
											<div className='grid-item'>
												<NewReportItem src={report.viewPhotoURL}
													nik={report.nik_pelapor}
													nama={report.nama_pelapor}
													laporan={report.laporan}
													noTelp={report.noTelp}
													email={report.email_pelapor}
													jenisKelamin={report.jenisKelamin}
													provinsiDiKTP={report.provinsiDiKTP}
													kotaDiKTP={report.kotaDiKTP}
													kecamatanDiKTP={report.kecamatanDiKTP}
													kelurahanDiKTP={report.kelurahanDiKTP}
													alamatDiKTP={report.alamatDiKTP}
													keterangan={report.keterangan}
													provinsiDomisili={report.provinsiDomisili}
													kotaDomisili={report.kotaDomisili}
													kecamatanDomisili={report.kecamatanDomisili}
													kelurahanDomisili={report.kelurahanDomisili}
													alamatDomisili={report.alamatDomisili}
													tanggal={hari + ', ' + tanggal + '/' + bulan + '/' + tahun}
													waktu={jam + ':' + menit + ':' + detik}
												/>
											</div>
											<div className='actions'>
												<div style={{ margin: '12px 0' }}>
													<Button onClick={() => {
														this.handleConfirm(report._id)
													}}>
														Konfirmasi
													</Button>
												</div>
												<div style={{ margin: '12px 0' }}>
													<Button onClick={() => {
														this.handleDelete(report._id)
													}}>
														Hapus
													</Button>
												</div>
											</div>

										</>
									)
								})
							}
						</Fragment>
					</div>
				</>
			)
		}
		else if (reports.length === 0) {
			return (
				<>
					<h1 style={{ marginTop: '12px' }}>Laporan Covid-19 Kab. Semarang</h1>
					<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', height: '70vh', justifyContent: 'center' }}>
						<p>Tidak ada laporan</p>
					</div>
				</>
			)
		}
		else {
			return (
				<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', height: '70vh', justifyContent: 'center' }}>
					<p>Please wait while retrieving data</p>
					<RingLoader />
				</div>
			)
		}

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
		confirmReport: (data) => dispatch(confirmReport(data)),
		deleteReport: (data) => dispatch(deleteReport(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCovidReportsPage);