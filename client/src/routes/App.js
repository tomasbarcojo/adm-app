import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoutes from '../auth/PrivateRoutes'
import LogIn from '../components/Login/Login'
import Register from '../components/Register/Register'
import Dashboard from '../components/Dashboard/Dashboard'
import Home from '../components/Home/Home'

const App = () => {

  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={LogIn} />
            <Route exact path="/register" component={Register} />
            {/* <PrivateRoutes exact path="/privateroute" component={Register} /> */}
            <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
    </Router>
  );
}

export default App;
