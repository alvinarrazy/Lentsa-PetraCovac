import React, { Component } from 'react';
import { Button } from './Button';
import '../Styles/WelcomeSection.css';

class WelcomeSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    };

    this.updatePredicate = this.updatePredicate.bind(this);
  }
  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isMobile: window.innerWidth < 960 });
  }


  render() {
    const isMobile = this.state.isMobile;
    // console.log(isMobile)
    return (
      <div className='hero-container' style={isMobile ?
        {} :
        { backgroundImage: `url(${process.env.PUBLIC_URL + '/images/viruz.png'})` }
      }>
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
