import React from 'react';
import { RingLoader } from '../Components/RingLoader';
import '../Styles/Error.css';

class ErrorPage extends React.Component {
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
						<h1>Error 404 Page not found</h1>
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


export default (ErrorPage);
