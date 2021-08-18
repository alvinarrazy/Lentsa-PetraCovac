import { combineReducers } from 'redux';

//reducers
import { authentication } from './loginReducer';
import { registerReducer } from './registerReducer';
import { covidDataReducer } from './covidReducer';
import { dataRSReducer } from './dataRSReducer';


export const rootReducer = combineReducers({
  authentication,
  registerReducer,
  covidDataReducer,
  dataRSReducer
});
