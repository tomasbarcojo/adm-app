import { useLocation, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoutes from '../auth/PrivateRoutes'
import LogIn from '../components/Login/Login'
import Register from '../components/Register/Register'
import Dashboard from '../components/Dashboard/Dashboard'
import Home from '../components/Home/Home'
import Suppliers from '../components/Reg-Mod/Suppliers/Suppliers'
import SideBar from '../components/Dashboard/SideBar'
import Admin from '../layout/Admin'

const App = () => {

  return (
    <Router>
      <Switch>
        {/* <PrivateRoutes exact path="/privateroute" component={Register} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/register" component={Register} />
        <Route path="/admin" component={Admin} />
        {/* <Route path="/dashboard" component={Suppliers} /> */}
      </Switch>
    </Router>
  );
}

export default App;
