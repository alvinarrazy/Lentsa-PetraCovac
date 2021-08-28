import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/UserCard.css'
import { Button } from './Button';

function UserCard(props) {
  // nomorIndukKependudukan: {type: String},
  // namaPanjang : {type:String},
  // email : {type:String},
  // password : {type:String},
  // noTelp: {type:String},
  // jenisKelamin: {type:String},
  // kotaLahir: {type:String},
  // tanggalLahir:{type:Date},
  // statusVaksin:{type:String},
  // statusCovid:{type:String},
  // role: {type:String}
  return (
    <>
      <Link to={props.to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className='user-card'>
          {/* <div className='photo'>
            <a className='photo-item' href={props.href}>
              <img src={props.src} />
            </a>
          </div> */}
          <div className='right-wrap'>
            <div className='identity-table'>

              <label>NIK:</label>
              <p>{props.nomorIndukKependudukan}</p>
              <label>Nama Panjang:</label>
              <p>{props.namaPanjang}</p>
              <label>Email:</label>
              <p>{props.email}</p>
              <label>No Telp:</label>
              <p>{props.noTelp}</p>
              <label>Jenis Kelamin:</label>
              <p>{props.jenisKelamin}</p>
              <label>Kota Lahir:</label>
              <p>{props.kotaLahir}</p>
              <label>Tanggal Lahir:</label>
              <p>{props.tanggalLahir}</p>
              <label>Status Vaksin:</label>
              <p>{props.statusVaksin}</p>
              <label>Status Covid:</label>
              <p>{props.statusCovid}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default UserCard;
