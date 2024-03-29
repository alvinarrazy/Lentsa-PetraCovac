/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { MenuItems, AdminMenuItems } from "./MenuItems"
import { compose } from 'redux';
import { TipsDropdown, DataDropdown, UpdateDataDropdown } from './Dropdown';
import { Link } from 'react-router-dom';
import { Button } from "./Button"
import '../Styles/Navbar.css'
import { authHeader, checkIfAdmin } from '../../redux/helpers/auth-header';
import { logout } from '../../redux/actions/LogoutAction';
import { CSSTransition } from 'react-transition-group';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
        this.state = {
            clicked: false,
            dropdown1: false,
            dropdown2: false,
            dropdown3: false,
            dropdown4: false
        }
    }

    handleLogout() {
        this.props.logout()
        this.props.history.push('/logging-out')
    }


    handleClick(hasDropdown, dropdownIndex) {
        if (hasDropdown) {
            this.setDropdown([dropdownIndex], !this.state[dropdownIndex]);
        } else {
            this.setState({ clicked: !this.state.clicked })
        }
    }

    handleClose() {
        this.setState({ clicked: false })
    }
    setDropdown(dropdownIndex, condition) {
        this.setState({ [dropdownIndex]: condition })
    }

    onMouseEnter(dropdownIndex) {
        if (window.innerWidth < 960) {
            this.setDropdown(dropdownIndex, false);
        } else {
            this.setDropdown(dropdownIndex, true);
        }
    };

    onMouseLeave(dropdownIndex) {
        if (window.innerWidth < 960) {
            this.setDropdown(dropdownIndex, false);
        } else {
            this.setDropdown(dropdownIndex, false);
        }
    };

    render() {
        const { clicked, dropdown1, dropdown2, dropdown3, dropdown4 } = this.state
        return (
            <nav className="NavbarItems">
                <h1 className="navbar-logo">
                    <Link onClick={() => this.handleClose()} to='/'>
                        <img src={this.props.src ? this.props.src : `${window.location.origin + "/images/lentsa.png"}`} />
                    </Link>
                </h1>
                <div className="menu-icon" onClick={() => this.handleClick()}>
                    <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    {checkIfAdmin() === 'admin' ?
                        <Fragment>
                            {
                                AdminMenuItems.map((item, index) => {
                                    return (
                                        <li className='nav-item' key={index}>
                                            <Link onClick={() => this.handleClick()} className={item.cName} to={item.url}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                            <li className='nav-item'
                                onMouseEnter={() => this.onMouseEnter('dropdown1')}
                                onMouseLeave={() => this.onMouseLeave('dropdown1')}>
                                <a onClick={() => this.handleClick(true, 'dropdown1')} className='nav-links'>
                                    Data <i className='fas fa-caret-down' />
                                </a>
                                <CSSTransition
                                    in={dropdown1}
                                    classNames="dropmenu"
                                    timeout={500}
                                >
                                    <>
                                        {dropdown1 && <DataDropdown />}
                                    </>
                                </CSSTransition>
                            </li>
                            <li className='nav-item'
                                onMouseEnter={() => this.onMouseEnter('dropdown2')}
                                onMouseLeave={() => this.onMouseLeave('dropdown2')}>
                                <a onClick={() => this.handleClick(true, 'dropdown2')} className='nav-links'>
                                    Update Data <i className='fas fa-caret-down' />
                                </a>
                                <CSSTransition
                                    in={dropdown2}
                                    classNames="dropmenu"
                                    timeout={500}
                                >
                                    <>
                                        {dropdown2 && <UpdateDataDropdown />}
                                    </>
                                </CSSTransition>
                            </li>
                        </Fragment>
                        :
                        <Fragment>
                            {
                                MenuItems.map((item, index) => {
                                    return (
                                        <li className='nav-item' key={index}>
                                            <Link onClick={() => this.handleClick()} className={item.cName} to={item.url}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                            <li className='nav-item'
                                onMouseEnter={() => this.onMouseEnter('dropdown3')}
                                onMouseLeave={() => this.onMouseLeave('dropdown3')}>
                                <a onClick={() => this.handleClick(true, 'dropdown3')} className='nav-links'>
                                    Data <i className='fas fa-caret-down' />
                                </a>
                                <CSSTransition
                                    in={dropdown3}
                                    classNames="dropmenu"
                                    timeout={500}
                                >
                                    <>
                                        {dropdown3 && <DataDropdown />}
                                    </>
                                </CSSTransition>
                            </li>
                            <li className='nav-item'
                                onMouseEnter={() => this.onMouseEnter('dropdown4')}
                                onMouseLeave={() => this.onMouseLeave('dropdown4')}>
                                <a onClick={() => this.handleClick(true, 'dropdown4')} className='nav-links'>
                                    Tips <i className='fas fa-caret-down' />
                                </a>
                                <CSSTransition
                                    in={dropdown4}
                                    classNames="dropmenu"
                                    timeout={500}
                                >
                                    <>
                                        {dropdown4 && <TipsDropdown />}
                                    </>
                                </CSSTransition>
                            </li>
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