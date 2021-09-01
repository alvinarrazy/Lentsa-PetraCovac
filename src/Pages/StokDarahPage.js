import React, { Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { checkIfAdmin, authHeader } from '../redux/helpers/auth-header';
import './Styles/Table.css'
import { API } from '../config';
import { RingLoader } from './Components/RingLoader';
import Footer from './Components/Footer'
import { Button } from './Components/Button'

class StokDarahPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sampel: [],
			isLoaded: false,
			error: false
		}
	}

	async componentWillMount() {
		try {
			let result = await axios.get(`${API}/stok-darah/get-all`)
			if (result) {
				this.setState({
					sampel: result.data,
					isLoaded: true
				})
			}
		}
		catch (error) {
			console.log(error)
		}

	}

	async handleDelete(dataId) {
		try {
			let deleteResult = await axios({
				method: 'delete',
				url: `${API}/stok-darah/delete/${dataId}`,
				headers: {
					Authorization: authHeader()
				  }	  
			})
			if (deleteResult) {
				console.log(deleteResult)
				window.location.reload();
			} else {
				this.setState({
					error: true
				})
			}
		} catch (error) {
			console.log(error.message)
			this.setState({
				error: true
			})
		}
	}


	render() {
		const { sampel, isLoaded } = this.state
		return (
			<>

				{isLoaded ? <>
					<div className='table-wrap'>
						<table className="data-kecamatan">
							<tr>
								<th>Jenis Sampel</th>
								<th>Golongan A</th>
								<th>Golongan B</th>
								<th>Golongan O</th>
								<th>Golongan AB</th>
								{checkIfAdmin() === 'admin' && <th>Hapus Data</th>}
							</tr>
							<Fragment>
								{
									sampel.map(satuSampel => {
										return (
											<tr>
												<td>{satuSampel.stokDarah}</td>
												<td>{satuSampel.golonganA}</td>
												<td>{satuSampel.golonganB}</td>
												<td>{satuSampel.golonganO}</td>
												<td>{satuSampel.golonganAB}</td>
												{checkIfAdmin() === 'admin' && <td><Button
													onClick={() => this.handleDelete(satuSampel._id)}>
													Hapus</Button></td>}
											</tr>
										)
									})
								}
							</Fragment>
						</table>
					</div>
					{ this.state.error === true &&
					<div className='ring-container' style={{marginTop:'20px', flexDirection: 'column', alignItems: 'center',width: '100%' }}>
						<p style={{color: 'red'}}>Error deleting data, please try again later</p>
					</div>
					}
					<Footer />
				</>
					:
					<>
						<div className='ring-container' style={{ flexDirection: 'column', alignItems: 'center', height: '85vh', width: '100%' }}>
							<p>Please wait while retrieving data</p>
							<RingLoader />
						</div>
					</>}
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StokDarahPage);
