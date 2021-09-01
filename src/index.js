import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './redux/reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reportWebVitals from './reportWebVitals';

const loggerMiddleware = createLogger();

let middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunkMiddleware, loggerMiddleware];
} else {
  middleware = [...middleware, thunkMiddleware];
}

//store
const store = createStore(rootReducer,
    applyMiddleware(
        ...middleware
    ));
//Pake store bisa
//PAke history juga bisa
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './NewMap';
// import reportWebVitals from './reportWebVitals';


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(ConsoleHelper))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
