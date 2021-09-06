import React from "react";
import '../Styles/NewReportItem.css'
import { Button } from './Button'

function NewReportItem(props) {
    return (
        <>
            <div className='article-container'>
                <div className='article'>
                    <div className='article-header-container'>
                        <div className='header'>
                            <h2>{props.laporan}</h2>
                            <div className='header-identity'>
                                <h3>{props.nama}</h3>
                                <span>{props.nik}</span>
                                <span>{props.email}</span>
                                <span>{props.noTelp}</span>
                            </div>
                            <span>{props.tanggal}</span>
                            <span>{props.waktu}</span>
                        </div>
                    </div>
                    <div className='article-content'>
                        <div className='photo'>
                            <img src={props.src} />

                        </div>
                        <div className='details'>
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
            </div>
        </>
    )
}

export default NewReportItem

/*
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
*/