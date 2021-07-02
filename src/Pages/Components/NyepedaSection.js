import React, { Component } from 'react';
import { Button } from './Button';
import '../Styles/NyepedaSection.css';

class DescriptionSection extends Component {
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
    const { isMobile } = this.state;
    return (
      <div className='nyepeda-wrap' style={isMobile ?
        {} :
        { backgroundImage: `url(${process.env.PUBLIC_URL + '/images/nyepeda.png'})` }
      }>
        <h1>Sandays Program Nyepeda Sekejap</h1>
        <div className='nyepeda-container'>
          <p>Sandays Program Nyepeda Sekejap adalah sebuah tren bersepeda pada era new normal.
            Tujuan dari program ini adalah menjaga serta meningkatkan imun masyarakat dengan
            bersepeda minimal 3 hari selama seminggu. Program ini akan kemudian dijadikan sebuah kebijakan
            baru yang akan diambil oleh pemerintah. Selain itu, akan ada aturan undang-undang mengenai bersepeda,
            rambu-rambu bersepeda, hingga sanksi untuk para pelanggar.</p>

        </div>
        <div className='dummy-right' style={{ float: 'right' }}></div>

      </div>
    );
  }
}

export default DescriptionSection;
