import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {history} from '../src/redux/helpers/history';
import {checkAuthentication} from './redux/helpers/checkAuth';

//Pages
import HomePage from "./Pages/HomePage";
import UpdateDataPage from "./Pages/UpdateDataPage";
import MapPage from './Pages/MapPage';
import StatsPage from "./Pages/StatsPage";
import DesaStatsPage from './Pages/DesaStatsPage';
import AdminLoginPage from './Pages/AdminLoginPage';

//Testing
import Tryout from './Pages/Tryout';
import ErrorPage from './Pages/ErrorPage';



function App() {

  return (
    <>
    <Router>
      <Switch  history={history}>
        <Route path='/' exact component={HomePage}/>
        <Route path='/home' exact component={HomePage}/>
        <Route path='/stats-data' exact component={StatsPage}/>
        <Route path='/stats-data/data-desa/:idKecamatan' exact component={DesaStatsPage}/>
        <Route path='/covid-map' exact component={MapPage}/>
        <Route path='/admin/testing' exact component={checkAuthentication() ? Tryout : ErrorPage}/>
        <Route path='/admin/update-data' exact component={checkAuthentication() ? UpdateDataPage : ErrorPage}/>
        <Route path='/admin/login' exact component={AdminLoginPage}/>
        <Route path='/error' exact component={ErrorPage}/>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
    </>
  );
}

export default App;
