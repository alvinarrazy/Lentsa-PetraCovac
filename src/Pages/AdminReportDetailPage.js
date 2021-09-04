import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ConsoleHelper from '../redux/helpers/ConsoleHelper';
import './Styles/Table.css'
import { API } from '../config';
import Footer from './Components/Footer';
import { RingLoader } from './Components/RingLoader';
import ReportItem from './Components/ReportItem';
import { confirmReport } from '../redux/actions/ReportAction';
import { Button } from './Components/Button';

class AdminReportDetailPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleConfirm = this.handleConfirm.bind(this)
		this.state = {
			reportDetails: {},
			isLoaded: false
		}
	}

	handleConfirm(id) {
		this.props.confirmReport(id)
	}


	async componentWillMount() {
		try {

			const reportId = window.location.search.replace('?', '');
			let reportResult = await axios.get(`${API}/report/get-report/${reportId}`)
			if (reportResult) {
				this.setState({
					reportDetails: reportResult.data,
					isLoaded: true
				})
			}
		}
		catch (error) {
			ConsoleHelper(error.message)
		}

	}


	render() {
		const { reportDetails, isLoaded } = this.state
		if (reportDetails && isLoaded) {
			return (
				<>
					<div className='detail-container' style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
							<ReportItem
								isDetail={true}
								src={reportDetails.viewPhotoURL}
								nik={reportDetails.nik_pelapor}
								nama={reportDetails.nama_pelapor}
								laporan={reportDetails.laporan}
								noTelp={reportDetails.noTelp}
								email={reportDetails.email_pelapor}
								jenisKelamin={reportDetails.jenisKelamin}
								provinsiDiKTP={reportDetails.provinsiDiKTP}
								kotaDiKTP={reportDetails.kotaDiKTP}
								kecamatanDiKTP={reportDetails.kecamatanDiKTP}
								kelurahanDiKTP={reportDetails.kelurahanDiKTP}
								alamatDiKTP={reportDetails.alamatDiKTP}
								keterangan={reportDetails.keterangan}
								provinsiDomisili={reportDetails.provinsiDomisili}
								kotaDomisili={reportDetails.kotaDomisili}
								kecamatanDomisili={reportDetails.kecamatanDomisili}
								kelurahanDomisili={reportDetails.kelurahanDomisili}
								alamatDomisili={reportDetails.alamatDomisili}
							/>
							<br />
							<br />
							<Button onClick={() => {
								this.handleConfirm(reportDetails._id);
							}}>Konfirmasi</Button>
						</div>
						<div className='dummy-right-window' style={{ width: '50%' }}>
							{this.props.reportReducer.isConfirming ?
								<>
									<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
										<p>Confirming...</p>
										<RingLoader />
									</div>
								</>
								:
								<></>
							}
							{this.props.reportReducer.confirmFails ?
								<>
									<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
										<p>Failed please reload the page or contact support.</p>
									</div>
								</>
								:
								<></>
							}
							{this.props.reportReducer.confirmSuccess ?
								<>
									<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
										<p>Laporan berhasil dikonfirmasi</p>
									</div>
								</>
								:
								<></>
							}
						</div>
					</div>
					<Footer />
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
		covidDataState: state.covidDataReducer,
		reportReducer: state.reportReducer //call by this.props.covidDataState.*
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		confirmReport: (data) => dispatch(confirmReport(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminReportDetailPage);
