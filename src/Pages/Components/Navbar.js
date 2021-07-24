import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { MenuItems, AdminMenuItems } from "./MenuItems"
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Button } from "./Button"
import '../Styles/Navbar.css'
import { authHeader, checkIfAdmin } from '../../redux/helpers/auth-header';

import { logout } from '../../redux/actions/LogoutAction';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.state = { clicked: false }
    }

    handleLogout() {
        this.props.logout()
        this.props.history.push('/logging-out')
    }


    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }


    render() {
        return (
            <nav className="NavbarItems">
                <h1 className="navbar-logo">
                    <Link to='/'>
                        <img src={this.props.src ? this.props.src : `${window.location.origin + "/images/lentsa.png"}`}>
                        </img>
                    </Link>
                </h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {checkIfAdmin() === 'admin' ?
                        <Fragment>
                            {
                                AdminMenuItems.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link className={item.cName} to={item.url}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </Fragment>
                        :
                        <Fragment>
                            {
                                MenuItems.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link className={item.cName} to={item.url}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </Fragment>
                    }
                    <li key='4'>
                        <a className='nav-links-mobile' onClick={() => authHeader() ?
                            this.handleLogout() :
                            this.props.history.push('/login')
                        }>
                            {authHeader() ? 'Log out' : 'Log in'}
                        </a>
                    </li>
                </ul>
                <Button
                    onClick={() /*biar gk auto run pas render*/ => authHeader() ?
                        this.handleLogout() :
                        this.props.history.push('/login')
                    }
                >{authHeader() ? 'Log out' : 'Log in'}</Button>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication, //call by this.props.covidDataState.*
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Navbar);