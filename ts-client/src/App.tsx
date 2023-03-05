import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {} from 'redux-persist/lib/integration/react';

import Home from './pages/Home';
import store, { persistor } from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  );
};

export default App;
