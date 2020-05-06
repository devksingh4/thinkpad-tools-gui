import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  HashRouter,
  Route
} from "react-router-dom";

// Screens
import Home from './Home';
import Trackpoint from './Trackpoint';
import Battery from './Battery';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <div>
        <Route path="/" exact     component={ Home } />
        <Route path="/trackpoint"     component={ Battery } />
        <Route path="/battery"     component={ Battery } />
      </div>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
