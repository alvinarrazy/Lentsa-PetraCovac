//MASIH ERROR JANGAN DIPAKE DULU
import { API } from '../../config';
import axios from 'axios';
import { covidConstant } from '../types';

export const covidService = {
    getAllKecamatan,
    getOneKecamatan,
    getDesaInKecamatan,
    getSumDataKecamatan,
    getDataFromURL,
    addKecamatan,
    addDesa,
    addKecamatanCSV,
    addDesaCSV,
    updateDataDesa,
    updateDataDesaURL
};

async function getAllKecamatan() {
    try {
        let resultKecamatan = await axios.get(`${API}${covidConstant.GET_ALL_KECAMATAN}`)
        return resultKecamatan.data
    }
    catch (error) {
        console.log(error)
    }
}

async function getOneKecamatan(namaKecamatan) {
    try {
        let resultKecamatan = await axios.get(`${API}${covidConstant.GET_ONE_KECAMATAN}${namaKecamatan}`)
        return resultKecamatan
    }
    catch (error) {
        console.log(error)
    }
}

async function getDesaInKecamatan(namaKecamatan) {
    try {
        let resultDesa = await axios.get(`${API}${covidConstant.GET_DESA_IN_KECAMATAN}${namaKecamatan}`)
        return resultDesa
    }
    catch (error) {
        console.log(error)
    }
}

async function getSumDataKecamatan(idKecamatan) {
    try {
        let resultDesa = await axios.get(`${API}${covidConstant.GET_SUM_DATA_KECAMATAN}${idKecamatan}`)
        return resultDesa
    }
    catch (error) {
        console.log(error)
    }
}

async function addKecamatan(dataKecamatan) {
    try {
        let resultKecamatanBaru = await axios.post(`${API}${covidConstant.TAMBAH_KECAMATAN}`, dataKecamatan)
        return resultKecamatanBaru
    }
    catch (error) {
        console.log(error)
    }
}

async function addDesa(dataDesa) {
    try {
        let resultDesaBaru = await axios.post(`${API}${covidConstant.TAMBAH_DESA}`, dataDesa)
        return resultDesaBaru
    }
    catch (error) {
        console.log(error)
    }
}

async function addKecamatanCSV(dataKecamatanCSV) {
    try {
        let resultPaketKecamatanBaru = await axios.post(`${API}${covidConstant.TAMBAH_KECAMATAN_CSV}`, dataKecamatanCSV)
        return resultPaketKecamatanBaru
    }
    catch (error) {
        console.log(error)

    }
}

async function addDesaCSV(dataDesaCSV) {
    try {
        let resultPaketDesaBaru = await axios.post(`${API}${covidConstant.TAMBAH_DESA_CSV}`, dataDesaCSV)
        return resultPaketDesaBaru
    }
    catch (error){
        console.log(error)
    }
}

async function getDataFromURL(id_desa){
    try {
        let resultHTML = await axios.get(`https://corona.semarangkab.go.id/covid/data_desa?id_kecamatan=${id_desa}`)
        return resultHTML
    }
    catch(error){
        console.log(error)
    }
}

async function updateDataDesa(data){
    try{
        let result = await axios.put(`${API}${covidConstant.EDIT_DESA}`, data)
        return result
    }catch(error){
        console.log(error)
    }
}

async function updateDataDesaURL(data, token){
    try{
        // let result = await axios.put(`${API}${covidConstant.EDIT_DESA_URL}`, data)
        // console.log(token)
        let result = await axios({
            method: 'put', //you can set what request you want to be
            url: `${API}${covidConstant.EDIT_DESA_URL}`,
            data: data,
            headers: {
              Authorization: token
            }
          })
        return result
    }catch(error){
        console.log(error)
    }
}