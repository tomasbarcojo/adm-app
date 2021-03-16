import { useLocation, BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import PrivateRoutes from '../auth/PrivateRoutes'
import LogIn from '../components/Login/Login'
import Register from '../components/Register/Register'
import Dashboard from '../components/Dashboard/Dashboard'
import Home from '../components/Home/Home'
import Suppliers from '../components/Reg-Mod/Suppliers/Suppliers'
import SideBar from '../components/Dashboard/SideBar'
import Admin from '../layout/Admin'

import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../actions/users'
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('userData'));
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    if (user) {
      dispatch(getUser(user.id, token, history))
    };
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/register" component={Register} />
        <PrivateRoutes path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
};

export default App;
