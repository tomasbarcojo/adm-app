// PrivateRoutes

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const logged = useSelector(state => state.userLogged)

  return (
    <Route {...rest} render={props => (
     logged ? (
      < Component  {...props} />
      ) : (
        <Redirect to='/login'/>
          )
      )} 
    />
  )
};


export default PrivateRoutes;