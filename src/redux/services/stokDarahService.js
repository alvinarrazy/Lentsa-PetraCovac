import { API } from '../../config';
import axios from 'axios';
import { stokDarahConstants } from '../types';
import ConsoleHelper from '../helpers/ConsoleHelper';

export const stokDarahService = {
    addStokDarah,
    editStokDarah
}

async function addStokDarah(data, token){
    try {
        ConsoleHelper(`${API}${stokDarahConstants.ADD_DATA}`)
        // let addedData = await axios.post(`${API}${stokDarahConstants.ADD_DATA}`, data)
        let addedData = await axios({
            method: 'post', //you can set what request you want to be
            url: `${API}${stokDarahConstants.ADD_DATA}`,
            data: data,
            headers: {
              Authorization: token
            }
        })
        return addedData
    } catch (error) {
        ConsoleHelper(error.message)
    }
}

async function editStokDarah(data, token){
    try {
        let addedData = await axios({
            method: 'put', //you can set what request you want to be
            url: `${API}${stokDarahConstants.EDIT_DATA}`,
            data: data,
            headers: {
              Authorization: token
            }
        })
        return addedData
    } catch (error) {
        ConsoleHelper(error.message)
    }
}