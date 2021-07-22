import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	adminLogin
} from '../../redux/actions/LoginAction';
import { authHeader } from '../../redux/helpers/auth-header';
import { history } from '../../redux/helpers/history';

class CheckIfAccessAllowed extends React.Component {
	constructor(props) {
		super(props);
	}


	componentDidUpdate(){
		if(this.props.authentication.loggedIn === true){
            if(!authHeader()){
                history.push('/error-auth')
            }
		}else if(this.props.authentication.loggedIn === false){
            history.push('/error-auth')
        }
	}

	render() {
		return (
			<></>
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckIfAccessAllowed);