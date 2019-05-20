import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { combineReducers, createStore, Reducer, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { Actions, jsonformsReducer, JsonFormsState, createAjv } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';


import contextSchema from './schema/json/context.json';
import unitSchema from './schema/json/unit.json';
import valueSchema from './schema/json/value.json';
import uischema from './schema/ui/value.json';

//-------------------------------------------------//
// Context Sub-Schema
// Location -> src/state/ducks/scidata/context/schema.js
const contextSchemaIdentifier = 'context.json'; 
const contextSchemaResolver = {
  order: 1,
  canRead: function(file: AnyAction) {
      return file.url.indexOf(contextSchemaIdentifier) !== -1;
  },
  read: function() {
      return JSON.stringify(contextSchema)
  }
}
// export defaul contextSchemaResolver

//-------------------------------------------------//
// Unit Sub-Schema
// Location -> src/state/ducks/scidata/unit/schema.js
const unitSchemaIdentifier = 'unit.json';
const unitSchemaResolver = {
  order: 1,
  canRead: function(file: AnyAction) {
      return file.url.indexOf(unitSchemaIdentifier) !== -1;
  },
  read: function() {
      return JSON.stringify(unitSchema)
  }
}
// export defaul unitSchemaResolver

//-------------------------------------------------//

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

// Combine all the sub / "ducks" reducers into the primary
// Location -> src/state/ducks/scidata
const rootReducer: Reducer<JsonFormsState, AnyAction> = combineReducers({ jsonforms: jsonformsReducer() });

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
    valueSchema,
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

