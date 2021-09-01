import { combineReducers } from 'redux';

//reducers
import { authentication } from './loginReducer';
import { registerReducer } from './registerReducer';
import { covidDataReducer } from './covidReducer';
import { dataRSReducer } from './dataRSReducer';
import { reportReducer } from './reportReducer';
import { stokDarahReducer } from './stokDarahReducer';


export const rootReducer = combineReducers({
  authentication,
  registerReducer,
  covidDataReducer,
  dataRSReducer,
  reportReducer,
  stokDarahReducer
});
