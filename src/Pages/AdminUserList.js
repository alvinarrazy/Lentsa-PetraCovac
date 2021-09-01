import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './Styles/Form.css';
import axios from 'axios';
import CheckIfAccessAllowed from './Components/CheckIfAccessAllowed';
import { filesReport } from '../redux/actions/ReportAction';
import UserCard from './Components/UserCard';
import './Styles/CardTable.css';
import { API } from '../config';
import { RingLoader } from './Components/RingLoader';
import { checkIfAdmin, authHeader } from '../redux/helpers/auth-header';
import { Button } from './Components/Button'

class AdminUserList extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this)
		this.state = {
			users: '',
			isLoading: true,
			error: false
		}
	}


	async componentWillMount() {
		try {
			let users = await axios.get(`${API}/account/get-all-users`)
			if (users == null) {
				console.log(users)
			}
			this.setState({
				users: users.data.users,
				isLoading: false
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
		const { users } = this.state
		this.setState({
			users: {
				...users,
				[name]: value //name dan value component dari <input> tag
			}
		});
	}

	handleError(status) {
		switch (status) {
			case 401:
				alert("Tidak dapat menghapus admin")
				this.setState({
					...this.state,
					error: false
				})
				break
			default:
				alert("Terjadi sesuatu, tidak dapat menghapus user")
				this.setState({
					...this.state,
					error: false
				})
				break
		}

	}

	handleSubmit(event) {
		event.preventDefault();
		const { users } = this.state
		this.props.filesReport(users)
	}

	async handleDelete(dataId) {
		try {

			let deleteResult = await axios({
				method: 'delete', //you can set what request you want to be
				url: `${API}/account/delete-user/${dataId}`,
				headers: {
					Authorization: authHeader()
				}
			})
			if (deleteResult) {
				console.log(deleteResult)
				window.location.reload();
			} else {
				console.log('tes')
				this.setState({
					error: true
				}, () => this.handleError)
			}
		} catch (error) {
			console.log(error.message)
			this.setState({
				error: true
			}, this.handleError(error.response.status))
		}
	}


	render() {
		const { users, isLoading } = this.state
		if (isLoading) {
			return (
				<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', height: '70vh', justifyContent: 'center' }}>
					<p>Please wait while retrieving data</p>
					<RingLoader />
				</div>
			)
		}
		else if (users && users.length !== 0) {
			console.log(users)
			return (
				<>
					<CheckIfAccessAllowed />
					<div className='grid-container'>
						<Fragment>
							{
								users.map(user => {
									return (
										<div className='grid-item'>
											<UserCard
												to={`/admin/covid-reports/details/:?${user._id}`}
												nomorIndukKependudukan={user.nomorIndukKependudukan}
												namaPanjang={user.namaPanjang}
												email={user.email}
												noTelp={user.noTelp}
												jenisKelamin={user.jenisKelamin}
												kotaLahir={user.kotaLahir}
												tanggalLahir={user.tanggalLahir}
												statusVaksin={user.statusVaksin}
												statusCovid={user.statusCovid}
											/>
											{checkIfAdmin() === 'admin' && <td><Button
												onClick={() => this.handleDelete(user._id)}>
												Hapus</Button></td>}
										</div>
									)
								})
							}
						</Fragment>
					</div>
				</>
			)
		}
		else if (users.length === 0) {
			return (
				<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', height: '70vh', justifyContent: 'center' }}>
					<p>Tidak ada laporan</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserList);