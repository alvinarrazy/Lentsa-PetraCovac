import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {history} from '../src/redux/helpers/history';

//Pages
import HomePage from "./Pages/HomePage";
import UpdateDataPage from "./Pages/UpdateDataPage";
import MapPage from './Pages/MapPage';
import StatsPage from "./Pages/StatsPage";

//Testing
import Tryout from './Pages/Tryout';



function App() {

  return (
    <>
    <Router>
      <Switch  history={history}>
        <Route path='/' exact component={HomePage}/>
        <Route path='/home' exact component={HomePage}/>
        <Route path='/testing' exact component={Tryout}/>
        <Route path='/stats-data' exact component={StatsPage}/>
        <Route path='/covid-map' exact component={MapPage}/>
        <Route path='/update-data' exact component={UpdateDataPage}/>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
    </>
  );
}

export default App;
