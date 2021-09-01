import React from 'react';
import '../Styles/Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>LENTSA PETRACOVAC FEATURES</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/trek.png'
              text='Fitur tracking distribusi vaksin Covid-19 dengan beberapa zona '
              label='Vaccine Tracking'
            />
            <CardItem
              src='images/statistik.png'
              text='Data statistik mengenai Covid-19 di Kabupaten Semarang serta daerah penyebarannya'
              label='Covid-19 Stats'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/olahraga.png'
              text='Anjuran serta panduan pola hidup sehat di era New Normal'
              label='Healthy Life'
            />
            <CardItem
              src='images/rumasakit.png'
              text='Informasi terkait lokasi dan fasilitas tenaga medis rumah sakit'
              label='Hospital Locator'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
