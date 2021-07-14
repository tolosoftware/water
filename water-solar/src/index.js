import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
axios.defaults.baseURL='https://awm.solar/app/public/';
//  axios.defaults.baseURL='http://localhost:8000/';
//  axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

const rootEl = document.getElementById('app-site');

// Create a reusable render method that we can call more than once
let render = () => {
  // Dynamically import our main App component, and render it
  const MainApp = require('./MainApp').default;
  ReactDOM.render(
    <MainApp/>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./MainApp', () => {
    const MainApp = require('./MainApp').default;
    render(
      <MainApp/>,
      rootEl
    );
  });
}

render();
