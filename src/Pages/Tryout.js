import React, { Fragment } from 'react';
import { history } from '../redux/helpers/history';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	addDesaCSV,
	editDataDesa,
	editDataDesaURL
} from '../redux/actions/CovidAction';
import { Button } from './Components/Button';
import Navbar from './Components/Navbar';
import ConsoleHelper from '../redux/helpers/ConsoleHelper';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './Styles/Transition.css'

class Tryout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: 0
		};
	}

	handleClick(e) {
		this.setState({ number: this.state.number + 1 });
	}

	render() {

		return (
			<div className='container'>
				<TransitionGroup>
					<CSSTransition transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
						<div className="number" key={this.state.number}>{this.state.number}</div>
					</CSSTransition>
				</TransitionGroup>
				<button onClick={this.handleClick.bind(this)}>Click Me!</button>
			</div>
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
		addDesaCSV: (jsonData) => dispatch(addDesaCSV(jsonData)),
		editDataDesa: (data) => dispatch(editDataDesa(data)),
		editDataDesaURL: (data) => dispatch(editDataDesaURL(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tryout);
