import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ReportItem.css'
import { Button } from './Button';

function ReportItem(props) {
  if (props.isDetail) {
    return (
      <>
        <div className='card-wrapper-detail'>
          <div className='photo'>
            <a className='photo-item' href={props.href}>
              <img src={props.src} />
            </a>
          </div>
          <div className='right-wrap'>
            <div className='description'>
              <label>NIK:</label>
              <p>{props.nik}</p>
              <label>Nama:</label>
              <p>{props.nama}</p>
              <label>Laporan:</label>
              <p>{props.laporan}</p>
              <label>Keterangan:</label>
              <p style={{ overflow: 'overlay' }}>{props.keterangan}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  else if (props.isUserDetail) {
    return (
      <>
        <div className='card-wrapper'>
          <div style={{width: '50%'}} className='description'>
            <label>NIK:</label>
            <p>{props.nik}</p>
            <label>Nama:</label>
            <p>{props.fullname}</p>
            <label>Role:</label>
            <p>{props.role}</p>
          </div>
          <div style={{width: '50%'}} className='description'>
            <label>Status Covid:</label>
            <p>{props.statuscovid}</p>
            <label>Status Vaksin:</label>
            <p>{props.statusvaksin}</p>
            <label>E-Mail:</label>
            <p>{props.email}</p>
          </div>
        </div>
      </>
    );

  }


  else {
    return (
      <>
        <div className='card-wrapper'>
          <div className='photo'>
            <img src={props.src} />
          </div>
          <div className='description'>
            <label>NIK:</label>
            <p>{props.nik}</p>
            <label>Nama:</label>
            <p>{props.nama}</p>
            <label>Laporan:</label>
            <p>{props.laporan}</p>
            <label>Keterangan:</label>
            <p style={{ overflow: 'overlay' }}>{props.keterangan}</p>
          </div>
        </div>
      </>
    );

  }
}

export default ReportItem;
