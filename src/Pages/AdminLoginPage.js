import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	adminLogin
} from '../redux/actions/LoginAction';
import { Button } from './Components/Button';
import { API } from '../config'
import Navbar from './Components/Navbar';
import './Styles/LoginForm.css'

class AdminLoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			admin: {
				username: '',
				password: ''
			}
		}
	}

	async componentWillMount() {
		try {


			let resultKecamatan = await axios.get(`${API}/covid/get-all-kecamatan`)
			this.setState({
				kecamatan: resultKecamatan.data.semua_kecamatan
			})
		}
		catch (error) {
			console.log(error.message)
		}

	}

	handleChange(event) {
		const { name, value } = event.target;
		const { admin } = this.state
		this.setState({
			admin: {
				...admin,
				[name]: value //name dan value component dari <input> tag
			}
		});
	}


	handleSubmit(event) {
		event.preventDefault();
		const {admin} = this.state
		this.props.adminLogin(admin)
		this.props.history.push('/')
	}	

	render() {
		const {admin} = this.state
		return (
			<>
				<Navbar />
				<div className='wrapper'>
					<form onSubmit={this.handleSubmit}>
						<div className='form'>
							<div className='title'>Welcome</div>
							<div className='subtitle'>Let's create your account!</div>
							<div className='input-container ic1'>
								<input onChange={this.handleChange} value={admin.username} name='username' className='input' placeholder=' ' />
								<div className='cut' />
								<label  className='placeholder'>
									Username
								</label>
							</div>
							<div className='input-container ic2'>
								<input type='password' onChange={this.handleChange} value={admin.password} name='password' className='input' placeholder=' ' />
								<div className='cut' />
								<label className='placeholder'>
									Password
								</label>
							</div>
							<button type='text' className='submit'>
								Submit
							</button>
						</div>
					</form>
				</div>
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
		adminLogin: (data) => dispatch(adminLogin(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginPage);