import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogIn from '../components/Login/Login'
import Register from '../components/Register/Register'

const App = () => {

  return (
    <Router>
        <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/register" component={Register} />
        </Switch>
    </Router>
  );
}

export default App;
