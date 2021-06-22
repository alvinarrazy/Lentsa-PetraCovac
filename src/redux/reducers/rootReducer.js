import {combineReducers} from 'redux';

//reducers
import {authentication} from './loginReducer';
import {register} from './registerReducer';


export const rootReducer = combineReducers({
    authentication,
    register
  });
  