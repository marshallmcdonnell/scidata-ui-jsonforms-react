import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Actions, JsonFormsState } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';

import jsonSchema from './state/ducks/scidata/jsonSchema.json';
import uischema from './state/ducks/scidata/uiSchema.json';

import { default as scidataJsonFormsConfiguration } from './state/ducks/scidata/config'

import { default as rootReducer } from './state/ducks/scidata'

const scidataState: JsonFormsState = {
  jsonforms: {
    cells: materialCells,
    renderers: materialRenderers
  }
};

const store = createStore(rootReducer, scidataState);

const data = {};

store.dispatch(
  Actions.init(
    data,
    jsonSchema,
    uischema,
    scidataJsonFormsConfiguration
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

