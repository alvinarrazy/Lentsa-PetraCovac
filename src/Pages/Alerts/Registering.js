import React from 'react';
import { connect } from 'react-redux';
import { RingLoader } from '../Components/RingLoader';
import '../Styles/Error.css';
import {
	register,
	reqRegister
} from '../../redux/actions/RegisterAction';
import ConsoleHelper from '../../redux/helpers/ConsoleHelper';

class Registering extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reducerState: {
				isRegistering: false,
				isRegisterFailed: false,
				doneRegister: false,
				data: {}
			}
		}
	}

	componentDidMount() {
		const { registerReducer } = this.props
		if (registerReducer.data) {
			this.props.register(registerReducer.data)
		}
	}

	async componentDidUpdate(prevProps) {
		const { reducerState } = this.state
		if (prevProps.registerReducer !== this.props.registerReducer) {
			this.setState({ reducerState: this.props.registerReducer });
		}
		if (reducerState.doneRegister === true) {
			const delay = ms => new Promise(res => setTimeout(res, ms));
			await delay(3000)
			this.props.history.push('/login')
		} else if (reducerState.isRegisterFailed === true) {
			const delay = ms => new Promise(res => setTimeout(res, ms));
			await delay(1000)
			this.props.history.push('/register')
		}
	}



	render() {
		return (
			<>
				<div className='error-container'>
					<div>
						<h1>Registering</h1>
						<p style={{ textAlign: 'center' }}>redirecting to login page</p>
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
		registerReducer: state.registerReducer //call by this.props.user.*
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (data) => dispatch(register(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Registering);
