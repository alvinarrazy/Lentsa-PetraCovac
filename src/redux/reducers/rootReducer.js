import {combineReducers} from 'redux';

//reducers
import {authentication} from './loginReducer';
import {register} from './registerReducer';
import {covidDataReducer} from './covidReducer';


export const rootReducer = combineReducers({
    authentication,
    register,
    covidDataReducer
  });
  