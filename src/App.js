import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {history} from '../src/redux/helpers/history';

//Pages
import HomePage from "./Pages/HomePage";

//Testing
import Tryout from './Pages/Tryout';



function App() {

  return (
    <>
    <Router>
      <Switch  history={history}>
        <Route path='/' exact component={HomePage}/>
        <Route path='/testing' exact component={Tryout}/>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
    </>
  );
}

export default App;
