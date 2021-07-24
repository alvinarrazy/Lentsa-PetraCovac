import React from 'react';
import { connect } from 'react-redux';
import { RingLoader } from '../Components/RingLoader';
import '../Styles/Error.css';

class LoggingIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	async componentDidUpdate() {
		if(this.props.authentication.loggedIn === true){
			const delay = ms => new Promise(res => setTimeout(res, ms));
			await delay(3000)
			this.props.history.push('/')
		}
	}


	render() {
		return (
			<>
				<div className='error-container'>
					<div>
						<h1>Logging In</h1>
						<p style={{ textAlign: 'center' }}>please wait while redirecting to homepage</p>
						<div className='ring-container'>
							<RingLoader />
						</div>
					</div>

				</div>
			</>
		)

	}

}

const mapStateToProps = (state) => {
	return {
		authentication: state.authentication
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggingIn);
