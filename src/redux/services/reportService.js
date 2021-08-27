//MASIH ERROR JANGAN DIPAKE DULU
import {API} from '../../config';
import axios from 'axios';
import { reportConstants } from '../types';

export const reportService = {
    filesNewReport,
    confirmReport
};


async function filesNewReport(data, token) {
    try {
         let result = await  axios({
            method: 'post', //you can set what request you want to be
            url: `${API}${reportConstants.REQUEST_FILES_REPORT}`,
            data: data,
            headers: {
              Authorization: token
            }
          })
         return result
    }
    catch (error) {
        console.log(error)
    }
}

async function confirmReport(data, token) {
  try {
       let result = await  axios({
          method: 'put', //you can set what request you want to be
          url: `${API}${reportConstants.REQUEST_CONFIRM_REPORT}/${data}`,
          headers: {
            Authorization: token
          }
        })
       return result
  }
  catch (error) {
      console.log(error)
  }
}

