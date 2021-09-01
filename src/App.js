import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { history } from '../src/redux/helpers/history';
import { authHeader, checkIfAdmin } from './redux/helpers/auth-header';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Navbar from './Pages/Components/Navbar';

//Pages
import HomePage from "./Pages/HomePage";
import MapPage from './Pages/MapPage';
import CovidStatsPage from "./Pages/CovidStatsPage";
import RSStatsPage from "./Pages/RSStatsPage";
import DesaStatsPage from './Pages/DesaStatsPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import YogaPage from './Pages/YogaPage';
import CaloriesCalculatorPage from './Pages/CaloriesCalculatorPage';
import SleepSchedulerPage from './Pages/SleepSchedulerPage';
import FilesReportPage from './Pages/FilesReportPage';
import StokDarahPage from './Pages/StokDarahPage';

//Admin
import Tryout from './Pages/Tryout';
import AdminUpdateDataPage from "./Pages/AdminUpdateDataPage";
import AdminUpdateDataRSPage from './Pages/AdminUpdateDataRSPage';
import AdminCovidReportsPage from './Pages/AdminCovidReportsPage';
import AdminReportDetailPage from './Pages/AdminReportDetailPage';
import AdminUserList from './Pages/AdminUserList';
import AdminUpdateDataStokDarahPage from './Pages/AdminUpdateDataStokDarahPage';

//Alerts
import ErrorPage from './Pages/Alerts/ErrorPage';
import AuthFailedPage from './Pages/Alerts/AuthFailedPage';
import AlreadyLoginPage from './Pages/Alerts/AlreadyLoginPage';
import LoggingIn from './Pages/Alerts/LoggingIn';
import LoggingOut from './Pages/Alerts/LoggingOut';
import Registering from './Pages/Alerts/Registering';
import NeedToLoginPage from './Pages/Alerts/NeedToLoginPage';




function App() {

  return (
    <Router>
      <>
        <Navbar />
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={450}
              classNames="fade"
            >
              <Switch location={location} history={history}>
                {/*Global*/}
                <Route path='/' exact component={HomePage} />
                <Route path='/home' exact component={HomePage} />
                <Route path='/data-covid' exact component={CovidStatsPage} />
                <Route path='/data-rs' exact component={RSStatsPage} />
                <Route path='/stok-darah' exact component={StokDarahPage} />
                <Route path='/data-covid/data-desa/:idKecamatan' exact component={DesaStatsPage} />
                <Route path='/covid-map' exact component={MapPage} />
                <Route path='/login' exact component={authHeader() ? AlreadyLoginPage : LoginPage} />
                <Route path='/register' exact component={authHeader() ? AlreadyLoginPage : RegisterPage} />
                <Route path='/tips/yoga' exact component={YogaPage} />
                <Route path='/tips/sleep-scheduler' exact component={SleepSchedulerPage} />
                <Route path='/tips/calories-calculator' exact component={CaloriesCalculatorPage} />
                
                {/*Admin*/}
                <Route path='/admin/testing' exact component={authHeader() && checkIfAdmin() === 'admin' ? Tryout : ErrorPage} />
                <Route path='/admin/update-data-covid' exact component={authHeader() && checkIfAdmin() === 'admin' ? AdminUpdateDataPage : ErrorPage} />
                <Route path='/admin/update-data-rs' exact component={authHeader() && checkIfAdmin() === 'admin' ? AdminUpdateDataRSPage : ErrorPage} />
                <Route path='/admin/covid-reports' exact component={authHeader() && checkIfAdmin() === 'admin' ? AdminCovidReportsPage : AuthFailedPage} />
                <Route path='/admin/covid-reports/details/:reportId' exact component={authHeader() && checkIfAdmin() === 'admin' ? AdminReportDetailPage : AuthFailedPage} />
                <Route path='/admin/user-list/' exact component={authHeader() && checkIfAdmin() === 'admin' ? AdminUserList : AuthFailedPage} />
                <Route path='/admin/update-stok-darah' exact component={authHeader() && checkIfAdmin() === 'admin' ? AdminUpdateDataStokDarahPage : AuthFailedPage} />
                
                {/* User */}
                <Route path='/user/files-report' exact component={authHeader() ? FilesReportPage : NeedToLoginPage  } />

                {/*Alerts*/}
                <Route path='/error-auth' exact component={AuthFailedPage} />
                <Route path='/already-logged-in' exact component={AlreadyLoginPage} />
                <Route path='/logging-in' exact component={LoggingIn} />
                <Route path='/logging-out' exact component={LoggingOut} />
                <Route path='/error' exact component={ErrorPage} />
                <Route path='/register/registering' exact component={Registering} />

                <Redirect from="*" to="/error" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </>
    </Router>
  );
}

export default App;
