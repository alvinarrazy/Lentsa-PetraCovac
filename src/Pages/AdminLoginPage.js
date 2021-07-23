import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	adminLogin
} from '../redux/actions/LoginAction';
import { API } from '../config'
import { Link } from 'react-router-dom'
import './Styles/LoginForm.css'
import { authHeader } from '../redux/helpers/auth-header';

class AdminLoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			admin: {
				username: '',
				password: ''
			},
			isMobile: false
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
		const { admin } = this.state
		this.props.adminLogin(admin)

	}

	componentDidUpdate() {
		if (this.props.authentication.loggedIn === true) {
			if (authHeader()) {
				this.props.history.push('/already-logged-in')
			}
		}
	}

	render() {
		const { admin, isMobile } = this.state
		return (
			<>
				<div className='form-container'>
					<div className='form-wrapper'>
						<img src="https://img.icons8.com/ios-glyphs/90/000000/administrator-male.png" />
						<h1>Administrator Login </h1>
						<p>Bersama melawan Covid-19</p>
						<form onSubmit={this.handleSubmit}>
							<label>Username</label>
							<input type='text' onChange={this.handleChange} value={admin.username} name='username' />
							<label>Password</label>
							<input type='password' onChange={this.handleChange} value={admin.password} name='password' />
							<div className='col-wrap'>
								<div className='col30'>
									<input type='checkbox' />
									<label style={{ marginLeft: '10px' }}>Remember me</label>
								</div>
								<div className='col30'>
									<Link to='#forgot'>Forgot Password?</Link>
								</div>
							</div>
							<input placeholder='Login' type='submit' />
							<Link to='#create'>Create Account</Link>
						</form>
					</div>
				</div>
			</>
		)

	}

}

const mapStateToProps = (state) => {
	return {
		covidDataState: state.covidDataReducer, //call by this.props.covidDataState.*
		authentication: state.authentication
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		adminLogin: (data) => dispatch(adminLogin(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginPage);