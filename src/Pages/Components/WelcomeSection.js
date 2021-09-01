import React, { Component } from 'react';
import { Button } from './Button';
import { authHeader, checkIfAdmin } from '../../redux/helpers/auth-header';
import '../Styles/WelcomeSection.css';
import ConsoleHelper from '../../redux/helpers/ConsoleHelper';

class WelcomeSection extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    // ConsoleHelper(isMobile)
    return (
      <div className='hero-container'>
        <div className='header-container'>
          {authHeader() && checkIfAdmin() === 'admin' ?
            <><div><img src="https://img.icons8.com/ios-glyphs/90/000000/administrator-male.png" /></div>
              <div><h1>Administrator Mode</h1></div></> :
            <><div className='title'><h1>Selamat Datang di Lentsa Petracovac</h1></div>
              <p>Siaga dalam satu visi, selamatkan sejuta jiwa negeri</p></>
          }
          <div className='hero-btns'>
            <Button
              className='btns'
              buttonStyle='btn--primary'
              buttonSize='btn--large'
            >
              LEARN MORE <i className='far fa-play-circle' />
            </Button>
          </div>
        </div>
        <div className='dummy-right' style={{ float: 'right' }}></div>
      </div>
    );
  }
}

export default WelcomeSection;
