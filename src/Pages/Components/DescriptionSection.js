import React, { Component } from 'react';
import { Button } from './Button';
import '../Styles/DescriptionSection.css';

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
    const isMobile = this.state.isMobile;

    return (
      <div className='desc-wrap' style={isMobile ?
        {} :
        { backgroundImage: `url(${process.env.PUBLIC_URL + '/images/pakjokow.png'})` }
      }>
        <div className='desc-container'>
          <h1>Proses Vaksinasi di Indonesia</h1>
          <p>
            Pelaksanaan vaksinasi COVID-19 bertujuan untuk memutus rantai penularan penyakit
            dan menghentikan wabah COVID-19. Vaksin COVID-19 bermanfaat untuk memberi perlindungan
            tubuh agar tidak jatuh sakit akibat COVID-19 dengan cara menimbulkan atau menstimulasi
            kekebalan spesifik dalam tubuh dengan pemberian vaksin.</p>
          <p>
            Pelayanan vaksinasi COVID-19 dilakukan oleh dokter, perawat atau bidan
            yang memiliki kompetensi dan dilaksanakan di Fasilitas Pelayanan Kesehatan
            milik Pemerintah Pusat, Pemerintah Daerah Provinsi, Pemerintah Daerah Kabupaten/Kota
            atau milik masyarakat/swasta yang memenuhi persyaratan yang sudah ditentukan oleh Kementerian
            Kesehatan Indonesia.
          </p>
          <p style={isMobile ?
            { paddingBottom: '30px' } :
            {}
          }>
            Pada tahap awal ini, vaksin COVID-19 akan diberikan kepada seluruh Tenaga Kesehatan,
            Asisten Tenaga Kesehatan, Tenaga penunjang serta mahasiswa yang menjalankan pendidikan
            profesi kedokteran yang bekerja pada fasilitas pelayanan kesehatan. Vaksin akan diberikan
            kepada petugas pelayanan publik yang terlibat secara langsung memberikan pelayanan kepada masyarakat.
          </p>

        </div>
        <div className='dummy-right' style={{ float: 'right' }}></div>

      </div>
    );
  }
}

export default DescriptionSection;
