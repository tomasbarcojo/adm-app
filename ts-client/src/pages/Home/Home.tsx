import React from 'react';

import { useCustomDispatch, useCustomSelector } from 'hooks/redux';
import { login } from 'redux/slices/auth';

const Home: React.FC = () => {
  const {
    auth: { accessToken, isLoading }
  } = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();

  console.log(accessToken);

  const handleLogin = (): void => {
    dispatch(
      login({
        username: 'admin',
        password: '1234'
      })
    );
  };

  return (
    <div>
      Home <button onClick={handleLogin}>Login</button>
      {isLoading === true ? 'loading...' : null}
    </div>
  );
};

export default Home;
