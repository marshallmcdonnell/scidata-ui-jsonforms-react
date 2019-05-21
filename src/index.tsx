import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { JsonFormsState } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';

import configureStore from './state/store';


const sciDataState: JsonFormsState = {
  jsonforms: {
    cells: materialCells,
    renderers: materialRenderers
  }
};

const store = configureStore(sciDataState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

