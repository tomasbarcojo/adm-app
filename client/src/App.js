import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogIn from './components/Login/Login'

const App = () => {

  return (
    <Router>
        <Switch>
            <Route exact path="/" component={LogIn} />
        </Switch>
    </Router>
  );
}

export default App;
