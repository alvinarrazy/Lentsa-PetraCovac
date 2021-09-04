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
              <label>No Telpon:</label>
              <p>{props.noTelp}</p>
              <label>Email:</label>
              <p>{props.email}</p>
              <label>Jenis Kelamin:</label>
              <p>{props.jenisKelamin}</p>
              <label>Provinsi di KTP:</label>
              <p>{props.provinsiDiKTP}</p>
              <label>Kota di KTP:</label>
              <p>{props.kotaDiKTP}</p>
              <label>Kecamatan di KTP:</label>
              <p>{props.kecamatanDiKTP}</p>
              <label>Kelurahan di KTP:</label>
              <p>{props.kelurahanDiKTP}</p>
              <label>Alamat di KTP:</label>
              <p>{props.alamatDiKTP}</p>
              <label>Provinsi saat ini:</label>
              <p>{props.provinsiDomisili}</p>
              <label>Kota/Kabupaten saat ini:</label>
              <p>{props.kotaDomisili}</p>
              <label>Kecamatan saat ini:</label>
              <p>{props.kecamatanDomisili}</p>
              <label>Kelurahan/Desa saat ini:</label>
              <p>{props.kelurahanDomisili}</p>
              <label>Alamat saat ini:</label>
              <p>{props.alamatDomisili}</p>
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
          <div style={{ width: '50%' }} className='description'>
            <label>NIK:</label>
            <p>{props.nik}</p>
            <label>Nama:</label>
            <p>{props.fullname}</p>
            <label>Role:</label>
            <p>{props.role}</p>
          </div>
          <div style={{ width: '50%' }} className='description'>
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
            <label>Provinsi saat ini:</label>
            <p>{props.provinsiDomisili}</p>
            <label>Kota/Kabupaten saat ini:</label>
            <p>{props.kotaDomisili}</p>
            <label>Kecamatan saat ini:</label>
            <p>{props.kecamatanDomisili}</p>
            <label>Kelurahan/Desa saat ini:</label>
            <p>{props.kelurahanDomisili}</p>
            <label>Alamat saat ini:</label>
            <p>{props.alamatDomisili}</p>
          </div>
        </div>
      </>
    );

  }
}

export default ReportItem;
