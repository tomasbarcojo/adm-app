import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'App.css';

import Home from 'pages/Home';
import Login from 'pages/Login';

// const getRoutes = (allRoutes) =>
//   allRoutes.map((route) => {
//     if (route.collapse) {
//       return getRoutes(route.collapse);
//     }

//     if (route.route) {
//       return (
//         <Route path={route.route} element={route.component} key={route.key} />
//       );
//     }

//     return null;
//   });

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
