import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {history} from '../src/redux/helpers/history';
import {authHeader} from './redux/helpers/auth-header';

//Pages
import HomePage from "./Pages/HomePage";
import UpdateDataPage from "./Pages/UpdateDataPage";
import MapPage from './Pages/MapPage';
import StatsPage from "./Pages/StatsPage";
import DesaStatsPage from './Pages/DesaStatsPage';
import AdminLoginPage from './Pages/AdminLoginPage';

//Testing
import Tryout from './Pages/Tryout';

//Alerts
import ErrorPage from './Pages/Alerts/ErrorPage';
import AuthFailedPage from './Pages/Alerts/AuthFailedPage';
import AlreadyLoginPage from './Pages/Alerts/AlreadyLoginPage';



function App() {

  return (
    <>
    <Router>
      <Switch  history={history}>
        {/*Global*/}
        <Route path='/' exact component={HomePage}/>
        <Route path='/home' exact component={HomePage}/>
        <Route path='/stats-data' exact component={StatsPage}/>
        <Route path='/stats-data/data-desa/:idKecamatan' exact component={DesaStatsPage}/>
        <Route path='/covid-map' exact component={MapPage}/>

        {/*Admin*/}
        <Route path='/admin/login' exact component={authHeader() ? AlreadyLoginPage : AdminLoginPage}/>
        <Route path='/admin/testing' exact component={authHeader() ? Tryout : ErrorPage}/>
        <Route path='/admin/update-data' exact component={authHeader() ? UpdateDataPage : ErrorPage}/>

        {/*Alerts*/}
        <Route path='/error-auth' exact component={AuthFailedPage}/>
        <Route path='/already-logged-in' exact component={AlreadyLoginPage}/>
        <Route path='/error' exact component={ErrorPage}/>
        <Redirect from="*" to="/error" />
      </Switch>
    </Router>
    </>
  );
}

export default App;
