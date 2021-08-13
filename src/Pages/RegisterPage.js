import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
	register,
	reqRegister
} from '../redux/actions/RegisterAction';
import './Styles/Form.css'
import CheckIfAccessAllowed from './Components/CheckIfAccessAllowed';
import Footer from './Components/Footer'

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeConfPass = this.handleChangeConfPass.bind(this)
		this.handleRegistering = this.handleRegistering.bind(this)
		this.state = {
			newUser: {
				nik: '',
				fullname: '',
				email: '',
				password: '',
				rw: '',
				rt: '',
				nomor: '',
				telpon: ''
			},
			confirmPassword: '',
			register: {
				isRegistering: false,
				isRegisterFailed: false,
				doneRegister: false
			}
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.registerReducer !== this.props.registerReducer) {
			this.setState({ register: this.props.registerReducer });
		}
	}

	handleChange(event) {
		const { name, value } = event.target;
		const { newUser } = this.state
		this.setState({
			newUser: {
				...newUser,
				[name]: value //name dan value component dari <input> tag
			}
		});
	}

	handleChangeConfPass(event) {
		const { value } = event.target;
		this.setState({
			confirmPassword: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const { newUser, confirmPassword } = this.state
		if (confirmPassword === newUser.password) {
			this.props.reqRegister(newUser)
			this.props.history.push('/register/registering')
		} else {
			alert('Password not match!')
		}
	}

	handleRegistering() {
		if (register.isRegistering) {
			this.props.history.push('/register/registering')
		}
	}


	render() {
		const { newUser, confirmPassword, register } = this.state
		const { registerReducer } = this.props
		return (
			<>
				<CheckIfAccessAllowed />
				<div className='container'>
					<form style={{
						width: '60%',
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column'
					}} onSubmit={this.handleSubmit}>

						<div className='form-left'>
							<div className='column-form'>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>NIK</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.nik} name='nik' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Nama Lengkap</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.fullname} name='fullname' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Email</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.email} name='email' required />
									</div>
								</div>
							</div>
							<div className='column-form'>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Nomor RW</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='number' value={newUser.rw} name='rw' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Nomor RT
										</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='number' value={newUser.rt} name='rt' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Nomor Rumah
										</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='number' value={newUser.nomor} name='nomor' required />
									</div>
								</div>
							</div>
							<div className='column-form'>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>No Telepon</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.telpon} name='telpon' required />

									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Password</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='password' value={newUser.password} name='password' required />

									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Conf. Password</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChangeConfPass} type='password' value={confirmPassword} name='confirmPassword' required />
									</div>
								</div>
							</div>
						</div>
						<div style={{ width: '80%' }} className='col-80'>
							<input type='submit' value='Submit' />
						</div>
					</form>
					<div className='form-right'>
						<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', height: '40%' }}>
							{registerReducer.isRegisterFailed ?
								<p>Register gagal, pastikan nik belum terdaftar</p>
								:
								<></>
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
		registerReducer: state.registerReducer //call by this.props.user.*
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (data) => dispatch(register(data)),
		reqRegister: (data) => dispatch(reqRegister(data))
		// editDataDesa: (data) => dispatch(editDataDesa(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);