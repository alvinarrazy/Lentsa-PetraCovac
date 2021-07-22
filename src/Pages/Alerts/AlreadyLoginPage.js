import React from 'react';
import { RingLoader } from '../Components/RingLoader';
import '../Styles/Error.css';

class AlreadyLoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	async componentDidMount() {
		const delay = ms => new Promise(res => setTimeout(res, ms));
		await delay(5000)
		this.props.history.push('/')
	}


	render() {
		return (
			<>
				<div className='error-container'>
					<div>
						<h1>Already Logged In</h1>
						<p style={{ textAlign: 'center' }}>redirecting to homepage</p>
						<div className='ring-container'>
							<RingLoader />
						</div>
					</div>

				</div>
			</>
		)

	}

}


export default (AlreadyLoginPage);
