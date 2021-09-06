//MASIH ERROR JANGAN DIPAKE DULU
import {API} from '../../config';
import axios from 'axios';
import { reportConstants } from '../types';
import ConsoleHelper from '../helpers/ConsoleHelper';

export const reportService = {
    filesNewReport,
    confirmReport,
    deleteReport
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
      ConsoleHelper(error.message)
      throw error.message
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
      ConsoleHelper(error.message)
      throw error.message
  }
}

async function deleteReport(data, token) {
  try {
       let result = await  axios({
          method: 'delete', //you can set what request you want to be
          url: `${API}${reportConstants.REQUEST_DELETE_REPORT}/${data}`,
          headers: {
            Authorization: token
          }
        })
       return result
  }
  catch (error) {
      ConsoleHelper(error.message)
      throw error.message
  }
}

