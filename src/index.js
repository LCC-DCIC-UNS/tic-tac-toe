import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import Game from './Game';

ReactDOMClient.createRoot(document.getElementById('root'))
  .render(<Game />);
