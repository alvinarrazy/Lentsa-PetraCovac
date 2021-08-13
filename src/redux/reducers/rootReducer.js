import {combineReducers} from 'redux';

//reducers
import {authentication} from './loginReducer';
import {registerReducer} from './registerReducer';
import {covidDataReducer} from './covidReducer';


export const rootReducer = combineReducers({
    authentication,
    registerReducer,
    covidDataReducer
  });
  