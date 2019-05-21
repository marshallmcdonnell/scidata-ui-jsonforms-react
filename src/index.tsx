import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Actions, JsonFormsState, createAjv } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';


import contextSchema from './state/ducks/scidata/schemas/context.json';
import unitSchema from './state/ducks/scidata/schemas/unit.json';
import jsonSchema from './state/ducks/scidata/jsonSchema.json';
import uischema from './state/ducks/scidata/uiSchema.json';

import { contextSchemaIdentifier, contextSchemaResolver } from './state/ducks/scidata/context/resolver'
import { unitSchemaIdentifier, unitSchemaResolver } from './state/ducks/scidata/unit/resolver'

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

