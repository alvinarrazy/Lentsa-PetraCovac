import React from 'react';
import { RingLoader } from '../Components/RingLoader';
import '../Styles/Error.css';

class AuthFailedPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	async componentDidMount() {
		const delay = ms => new Promise(res => setTimeout(res, ms));
		await delay(5000)
		this.props.history.push('/admin/login')
	}


	render() {
		return (
			<>
				<div className='error-container'>
					<div>
						<h1>Administrator Authentication Failed</h1>
						<p style={{ textAlign: 'center' }}>redirecting to login admin</p>
						<div className='ring-container'>
							<RingLoader />
						</div>
					</div>

				</div>
			</>
		)

	}

}


export default (AuthFailedPage);
