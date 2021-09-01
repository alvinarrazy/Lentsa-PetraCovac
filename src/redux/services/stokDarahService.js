import { API } from '../../config';
import axios from 'axios';
import { stokDarahConstants } from '../types';

export const stokDarahService = {
    addStokDarah,
    editStokDarah
}

async function addStokDarah(data, token){
    try {
        let addedData = await axios.create({
            method: 'post', //you can set what request you want to be
            url: `${API}${stokDarahConstants.ADD_DATA}`,
            data: data,
            headers: {
              Authorization: token
            }
        })
        return addedData
    } catch (error) {
        console.log(error.message)
    }
}

async function editStokDarah(data, token){
    try {
        let addedData = await axios.create({
            method: 'put', //you can set what request you want to be
            url: `${API}${stokDarahConstants.EDIT_DATA}`,
            data: data,
            headers: {
              Authorization: token
            }
        })
        return addedData
    } catch (error) {
        console.log(error.message)
    }
}