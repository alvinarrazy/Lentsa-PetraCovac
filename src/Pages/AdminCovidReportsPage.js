import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './Styles/Form.css';
import axios from 'axios';
import CheckIfAccessAllowed from './Components/CheckIfAccessAllowed';
import { Link } from 'react-router-dom';
import { filesReport } from '../redux/actions/ReportAction';
import ReportItem from './Components/ReportItem';
import './Styles/CardTable.css';
import { API } from '../config';
import { RingLoader } from './Components/RingLoader';

class AdminCovidReportsPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			reports: '',
			isLoading: false,
		}
	}


	async componentWillMount() {
		try {
			let reports = await axios.get(`${API}/report/get-all-reports`)
			if (reports == null) {
				console.log(reports)
			}
			this.setState({
				reports: reports.data.posts
			})
		} catch (error) {
			console.log(error.message)
		}
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
		const { reports } = this.state
		if (reports) {
			console.log(reports)
			return (
				<>
					<CheckIfAccessAllowed />
					<div className='grid-container'>
						<Fragment>
							{
								reports.map(report => {
									return (
										<div className='grid-item'>
											<Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/admin/covid-reports/details/:?${report._id}`}>
												<ReportItem src={report.viewPhotoURL}
													nik={report.nik_pelapor}
													nama={report.nama_pelapor}
													laporan={report.laporan}
													keterangan={report.keterangan}
												/>
											</Link>
										</div>
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
				<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', height: '70vh', justifyContent: 'center' }}>
					<p>Tidak ada laporan</p>
				</div>
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
		filesReport: (data) => dispatch(filesReport(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCovidReportsPage);