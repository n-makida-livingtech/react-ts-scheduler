import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import Basic from './Basic';

import '../src/css/style.css';

render(
  <Router>
    <Route exact path='/' component={Basic} />
  </Router>,
  document.getElementById('root')
);
