import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	login
} from '../redux/actions/LoginAction';
import { API } from '../config'
import { Link } from 'react-router-dom'
import './Styles/LoginForm.css'
import ConsoleHelper from '../redux/helpers/ConsoleHelper';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			user: {
				email: '',
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
			ConsoleHelper(error.message)
		}

	}

	handleChange(event) {
		const { name, value } = event.target;
		const { user } = this.state
		this.setState({
			user: {
				...user,
				[name]: value //name dan value component dari <input> tag
			}
		});
	}


	handleSubmit(event) {
		event.preventDefault();
		const { user } = this.state
		this.props.login(user)
		this.props.history.push('logging-in')
	}


	render() {
		const { user} = this.state
		return (
			<>
				<div className='form-container'>
					<div className='form-wrapper'>
						<h1>Login </h1>
						<p>Bersama melawan Covid-19</p>
						<form onSubmit={this.handleSubmit}>
							<label>Email</label>
							<input type='text' onChange={this.handleChange} value={user.email} name='email' />
							<label>Password</label>
							<input type='password' onChange={this.handleChange} value={user.password} name='password' />
							<div className='col-wrap'>
								<div className='col30'>
									<input style={{
										width: 'auto',
										height: 'auto',
										margin: 'auto auto'
									}} type='checkbox' />
									<label style={{ marginLeft: '10px' }}>Remember me</label>
								</div>
								{/* <div className='col30'>
									<Link to='#forgot'>Forgot Password?</Link>
								</div> */}
							</div>
							<input value='Login' type='submit' />
							<Link to='/register'>Create Account</Link>
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
		login: (data) => dispatch(login(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);