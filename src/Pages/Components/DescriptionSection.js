import React from 'react';
import { Button } from './Button';
import '../Styles/DescriptionSection.css';

function DescriptionSection() {
  return (
    <div className='hero-container' style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/images/nyepeda.png'})`
    }}>
      <h1>Sandays Program Nyepeda Sekejap</h1>
      <div className='desc-container'>
        <p>Siaga dalam satu visi, selamatkan sejuta jiwa negeri sdfhahsdfahsfafadfjajfafjiaf
        sfsjdfhaskfhasjk hsdfjka shfdkja jdafk</p>

      </div>
      <div className='dummy-right' style={{ float: 'right' }}></div>

    </div>
  );
}

export default DescriptionSection;
