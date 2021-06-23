import React from 'react';
import { Button } from './Button';
import '../Styles/NyepedaSection.css';

function DescriptionSection() {
  return (
    <div className='nyepeda-wrap' style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/images/nyepeda.png'})`
    }}>
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

export default DescriptionSection;
