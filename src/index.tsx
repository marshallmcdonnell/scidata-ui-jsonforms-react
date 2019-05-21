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

import { default as rootReducer } from './state/ducks/scidata'

// Initial state for redux
// Location -> (here? will be passed into 'configureStore', I think)
const scidataState: JsonFormsState = {
  jsonforms: {
    cells: materialCells,
    renderers: materialRenderers
  }
};

//-------------------------------------------------//

// export default function configureStore( scidataState ) {


// Create Redux store
// Location -> src/state/store.js
const store = createStore(rootReducer, scidataState);

//-------------------------------------------------//
/* 
Location -> src/state/ducks/scidata/index.js
Export -> jsonFormsConfiguration

imports:
 - contextSchema from ./src/state/ducks/scidata/schema/context.json
*/
// AJV: Another Json Schema Validator
const ajv = createAjv({
  useDefaults: true
})
ajv.addSchema(contextSchema, contextSchemaIdentifier);
ajv.addSchema(unitSchema, unitSchemaIdentifier);

const jsonFormsConfiguration = {
  ajv: ajv,
  refParserOptions: {
    resolve: {
      foo: contextSchemaResolver,
      bar: unitSchemaResolver
    } as any
  }
}

const data = {};

store.dispatch(
  Actions.init(
    data,
    jsonSchema,
    uischema,
    jsonFormsConfiguration
  )
);

// export store

//-------------------------------------------------//

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

