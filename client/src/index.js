import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./store/index.js"
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  //<React.StrictMode>
  <Provider store={store}>
    <Router>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Router>
  </Provider>,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
