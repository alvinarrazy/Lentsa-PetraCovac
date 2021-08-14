/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom'
import Footer from './Components/Footer';
import './Styles/Tips.css'
import './Styles/Yoga.css'


class Yoga extends React.Component {
  render() {
    return (
      <>
        <div className='tips-container'>
          <div className='tips-header'>
            <img src='/images/headerAtasHijau.png' />
            <div className='header-title'>
              <h1>Healthy Life</h1>
              <p>Olahraga #DirumahAja</p>
            </div>
          </div>
          <div className='tips-content'>
            <div className='left-arrow'>
              <a onClick={() => console.log("tes")}>
                <img src='/images/arah.png' />
              </a>            </div>
            <div className='yoga'>
              <h1>Yoga</h1>
              <div className='yoga-pic'>
                <img src='/images/yoga.png' alt='Yoga' />
              </div>
              <p>Melakukan Yoga selama 30 menit dalam sehari akan membuat tubuh anda menjadi lebih rileks dan juga membuat tidur anda lebih berkualitas.</p>
            </div>
            <div className='right-arrow'>
            <a onClick={() => console.log("tes")}>
                <img style={{ transform: 'rotateY(180deg)' }} src='/images/arah.png' />
              </a>
            </div>
          </div>
          <div className='tips-footer'>
            <img src='/images/headerBawahHijau.png' />
          </div>
        </div>
      </>
    )
  }
}

export default Yoga;
