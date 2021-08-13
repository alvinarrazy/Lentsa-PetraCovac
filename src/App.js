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
import StatsPage from "./Pages/StatsPage";
import DesaStatsPage from './Pages/DesaStatsPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import YogaPage from './Pages/YogaPage';
import CaloriesCalculatorPage from './Pages/CaloriesCalculatorPage';
import SleepSchedulerPage from './Pages/SleepSchedulerPage';

//Admin
import Tryout from './Pages/Tryout';
import AdminUpdateDataPage from "./Pages/AdminUpdateDataPage";
import AdminUpdateDataRSPage from './Pages/AdminUpdateDataRSPage';

//Alerts
import ErrorPage from './Pages/Alerts/ErrorPage';
import AuthFailedPage from './Pages/Alerts/AuthFailedPage';
import AlreadyLoginPage from './Pages/Alerts/AlreadyLoginPage';
import LoggingIn from './Pages/Alerts/LoggingIn';
import LoggingOut from './Pages/Alerts/LoggingOut';
import Registering from './Pages/Alerts/Registering'




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
                <Route path='/stats-data' exact component={StatsPage} />
                <Route path='/stats-data/data-desa/:idKecamatan' exact component={DesaStatsPage} />
                <Route path='/covid-map' exact component={MapPage} />
                <Route path='/login' exact component={authHeader() ? AlreadyLoginPage : LoginPage} />
                <Route path='/register' exact component={authHeader() ? AlreadyLoginPage : RegisterPage} />
                <Route path='/healthy-life/yoga' exact component={YogaPage} />
                <Route path='/healthy-life' exact component={YogaPage} />
                <Route path='/healthy-life/sleep-scheduler' exact component={SleepSchedulerPage} />
                <Route path='/healthy-life/calories-calculator' exact component={CaloriesCalculatorPage} />

                {/*Admin*/}
                <Route path='/admin/testing' exact component={authHeader() && checkIfAdmin() === 'admin' ? Tryout : ErrorPage} />
                <Route path='/admin/update-data-covid' exact component={authHeader() && checkIfAdmin() === 'admin' ? AdminUpdateDataPage : ErrorPage} />
                <Route path='/admin/update-data-rs' exact component={authHeader() && checkIfAdmin() === 'admin' ? AdminUpdateDataRSPage : ErrorPage} />

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
