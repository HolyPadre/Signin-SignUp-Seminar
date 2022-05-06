import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from "./components/HomePage"
import CustomerSignup from "./components/CustomerSignup"
import  VendorSignup from "./components/VendorSignup"
import Login from "./components/Login"
import CustomerDashboard from "./components/CustomerDashboard"
import VendorDashboard from "./components/VendorDashboard"

import {CPrivateRoute, VPrivateRoute} from "./private/PrivateRoute"

import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
      <Router>
      <div className="App">
        <Navbar/>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/customer/signup" component={CustomerSignup}/>
            <Route exact path="/vendor/signup" component={VendorSignup}/>
            <Route exact path="/login" component={Login}/>
            <CPrivateRoute exact path="/customer/dashboard" component={CustomerDashboard} />
            <VPrivateRoute exact path="/vendor/dashboard"  component={VendorDashboard} />     
        </Switch> 
      </div>
      </Router>
      
    
  );
}

export default App;
