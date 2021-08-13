import React from 'react';
import { Link } from 'react-router-dom'
import './Styles/Tips.css'
import './Styles/Yoga.css'


class Yoga extends React.Component {
  render() {
    return (
      <>
        <div className='tips-container'>
          {/* <div className='tips-header'>
          
          </div> */}
          <div className='tips-content'>
            <div className='yoga'>
              <h1>Yoga</h1>
              <div className='yoga-pic'>
                <img src='/images/yoga.png' alt='Yoga' />
              </div>
              <p>Melakukan Yoga selama 30 menit dalam sehari akan membuat tubuh anda menjadi lebih rileks dan juga membuat tidur anda lebih berkualitas.</p>
            </div>
          </div>
          {/* <div className='tips-footer'>

          </div> */}
        </div>
      </>
    )
  }
}

export default Yoga;
