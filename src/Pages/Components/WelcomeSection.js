import React, { Component } from 'react';
import { Button } from './Button';
import '../Styles/WelcomeSection.css';

class WelcomeSection extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    // console.log(isMobile)
    return (
      <div className='hero-container'>
        <div className='header-container'>
          <h1>Selamat Datang di Lentsa Petracovac</h1>
          <p>Siaga dalam satu visi, selamatkan sejuta jiwa negeri</p>
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
