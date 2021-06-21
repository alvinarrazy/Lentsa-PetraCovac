import React from 'react';
import { Button } from './Button';
import '../Styles/HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container' style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/images/viruz.png'})`
    }}>
      <div className='header-container'>
        <h1>Selamat Datang di Lentsa Petracovac</h1>
        <p>Siaga dalam satu visi, selamatkan sejuta jiwa negeri</p>
        <div className='hero-btns'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            GET STARTED
          </Button>
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            onClick={console.log('hey')}
          >
            WATCH TRAILER <i className='far fa-play-circle' />
          </Button>
        </div>
      </div>
      <div className='dummy-right' style={{float: 'right'}}></div>

    </div>
  );
}

export default HeroSection;
