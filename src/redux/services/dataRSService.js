//MASIH ERROR JANGAN DIPAKE DULU
import { API } from '../../config';
import axios from 'axios';
import { dataRSConstants } from '../types';

export const dataRSService = {
    addDataRS,
    editDataRS
};

async function addDataRS(data, token){
    try{
        // let result = await axios.put(`${API}${covidConstant.EDIT_DESA_URL}`, data)
        // console.log(token)
        let result = await axios({
            method: 'post', //you can set what request you want to be
            url: `${API}${dataRSConstants.ADD_DATA}`,
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

async function editDataRS(data, token){
    try{
        // let result = await axios.put(`${API}${covidConstant.EDIT_DESA_URL}`, data)
        // console.log(token)
        let result = await axios({
            method: 'put', //you can set what request you want to be
            url: `${API}${dataRSConstants.EDIT_DATA}`,
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