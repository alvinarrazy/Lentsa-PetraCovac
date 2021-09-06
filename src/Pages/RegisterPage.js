import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
	register,
	reqRegister
} from '../redux/actions/RegisterAction';
import './Styles/Form.css'
import CheckIfAccessAllowed from './Components/CheckIfAccessAllowed';
import Footer from './Components/Footer'
import ConsoleHelper from '../redux/helpers/ConsoleHelper';

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeConfPass = this.handleChangeConfPass.bind(this)
		this.handleRegistering = this.handleRegistering.bind(this)
		this.handleError = this.handleError.bind(this)
		this.handleChangeSelect = this.handleChangeSelect.bind(this)
		this.state = {
			newUser: {
				nomorIndukKependudukan: '',
				namaPanjang: '',
				email: '',
				password: '',
				noTelp: '',
				jenisKelamin: '',
				kotaLahir: '',
				tanggalLahir: '',
				provinsiDiKTP: '',
				kotaDiKTP: '',
				kecamatanDiKTP: '',
				kelurahanDiKTP: '',
				alamatDiKTP: '',
				provinsiDomisili: '',
				kotaDomisili: '',
				kecamatanDomisili: '',
				kelurahanDomisili: '',
				alamatDomisili: ''
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
				[name]: value
			}
		});
	}

	handleChangeSelect(e) {
		const { name } = e.target
		var index = e.nativeEvent.target.selectedIndex;
		const { value } = e.nativeEvent.target[index];
		const { newUser } = this.state
		this.setState({
			newUser: {
				...newUser,
				[name]: value
			}
		})
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
			alert('Password does not match!')
		}
	}

	handleRegistering() {
		if (this.state.register.isRegistering) {
			this.props.history.push('/register/registering')
		}
	}

	handleError() {
		const { registerReducer } = this.props
		switch (registerReducer.errorDetails.message) {
			case 'NIK telah terdaftar':
				return (
					<p>Register gagal, pastikan nik belum terdaftar</p>
				)
			case 'Email telah terdaftar':
				return (
					<p>Register gagal, pastikan email belum terdaftar</p>
				)
			default:
				return (
					<p>Register gagal, coba lagi nanti atau hubungi administrasi</p>
				)
		}
	}

	render() {
		const { newUser, confirmPassword } = this.state
		const { registerReducer } = this.props
		return (
			<>
				<CheckIfAccessAllowed />
				<div style={{ flexDirection: 'column' }} className='container'>
					<div style={{ width: '100%', height: '24px' }} className='form-right'>
						<div className='ring-container' style={{ color: 'red', flexDirection: 'column', alignItems: 'center', height: '40%' }}>
							{registerReducer.isRegisterFailed ?
								this.handleError()
								:
								<></>
							}

						</div>
					</div>

					<form style={{
						width: '100%',
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
										<input onChange={this.handleChange} type='text' value={newUser.nomorIndukKependudukan} name='nomorIndukKependudukan' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Nama Lengkap</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.namaPanjang} name='namaPanjang' required />
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
										<label>Jenis Kelamin</label>
									</div>
									<div className='col-row-form'>
										<select onChange={this.handleChangeSelect} name='jenisKelamin' placeholder='jenisKelamin' required>
											<option disabled selected value>Pilih Jenis Kelamin</option>
											<option value='Laki-laki'>Laki-laki</option>
											<option value='Perempuan'>Perempuan</option>
										</select>
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Kota Lahir</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.kotaLahir} name='kotaLahir' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Tanggal Lahir</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='date' value={newUser.tanggalLahir} name='tanggalLahir' required />
									</div>
								</div>
							</div>
							<div className='column-form'>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Provinsi di KTP</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.provinsiDiKTP} name='provinsiDiKTP' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Kota di KTP</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.kotaDiKTP} name='kotaDiKTP' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Kecamatan di KTP</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.kecamatanDiKTP} name='kecamatanDiKTP' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Kelurahan di KTP</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.kelurahanDiKTP} name='kelurahanDiKTP' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Alamat di KTP</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.alamatDiKTP} name='alamatDiKTP' required />
									</div>
								</div>
							</div>
							<div className='column-form'>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Provinsi saat ini</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.provinsiDomisili} name='provinsiDomisili' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Kota/Kabupaten saat ini</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.kotaDomisili} name='kotaDomisili' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Kecamatan saat ini</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.kecamatanDomisili} name='kecamatanDomisili' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Kelurahan/Desa saat ini</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.kelurahanDomisili} name='kelurahanDomisili' required />
									</div>
								</div>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>Alamat saat ini</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.alamatDomisili} name='alamatDomisili' required />
									</div>
								</div>
							</div>
							<div className='column-form'>
								<div className='row-form'>
									<div className='col-row-form'>
										<label>No Telepon</label>
									</div>
									<div className='col-row-form'>
										<input onChange={this.handleChange} type='text' value={newUser.noTelp} name='noTelp' required />
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