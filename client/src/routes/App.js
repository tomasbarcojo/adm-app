import { useLocation, BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import PrivateRoutes from '../auth/PrivateRoutes'
import LogIn from '../components/Login/Login'
import Register from '../components/Register/Register'
import Home from '../components/Home/Home'
import Admin from '../layout/Admin'

import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../actions/users'
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  var user = '';
  var token = '';
  if (localStorage.length > 0) {
    console.log('LOCAL', localStorage.length)
    user = JSON.parse(localStorage.getItem('userData'))
    token = JSON.parse(localStorage.getItem('token'));
  } else {
    console.log('SESSION', sessionStorage.length)
    user = JSON.parse(sessionStorage.getItem('userData'))
    token = JSON.parse(sessionStorage.getItem('token'));
  }

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
