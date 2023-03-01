import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoutes from '../auth/PrivateRoutes';
import LogIn from '../components/Login/Login';
import Register from '../components/Register/Register';
import Home from '../components/Home/Home';
import Admin from '../layout/Admin';
import CategoryProducts from '../components/CategoryProducts/CategoryProducts';
import PageNotFound from '../components/NotFound/NotFound'

import { useDispatch } from 'react-redux';
import { getUser } from '../actions/users';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  let user = '';
  let token = '';
  if (localStorage.length > 0) {
    user = JSON.parse(localStorage.getItem('userData'));
    token = JSON.parse(localStorage.getItem('access_token'));
  } else {
    user = JSON.parse(sessionStorage.getItem('userData'));
    token = JSON.parse(sessionStorage.getItem('access_token'));
  }

  useEffect(() => {
    if (user) {
      dispatch(getUser(user.id, token));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/register" component={Register} />
        <PrivateRoutes path="/admin" component={Admin} />
        <Route exact path="/category/:id" component={CategoryProducts} />
        <Route path="*" component={PageNotFound} />
      </Routes>
    </Router>
  );
};

export default App;
