import React from 'react';
import ReactDOM from 'react-dom';
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
        <Route path="/trackpoint"     component={ Trackpoint } />
        <Route path="/battery"     component={ Battery } />
      </div>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
