import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { combineReducers, createStore, Reducer, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { Actions, jsonformsReducer, JsonFormsState, createAjv } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';


import contextSchema from './schema/scidata_context.json';
import unitSchema from './schema/scidata_unit.json';
import valueSchema from './schema/scidata_value.json';
import uischema from './uischema/scidata_value.json';

const data = {};

const initState: JsonFormsState = {
    jsonforms: {
      cells: materialCells,
      renderers: materialRenderers
    }
};

const ajv = createAjv({
    useDefaults: true
})


const contextSchemaIdentifier = 'scidata_context.json';
const unitSchemaIdentifier = 'scidata_unit.json';

ajv.addSchema(contextSchema, contextSchemaIdentifier);
ajv.addSchema(unitSchema, unitSchemaIdentifier);


const rootReducer: Reducer<JsonFormsState, AnyAction> = combineReducers({ jsonforms: jsonformsReducer() });
const store = createStore(rootReducer, initState);


// Allow json-schema-ref-resolver to resolve same schema
const contextSchemaResolver = {
  order: 1,
  canRead: function(file: AnyAction) {
      return file.url.indexOf(contextSchemaIdentifier) !== -1;
  },
  read: function() {
      return JSON.stringify(contextSchema)
  }
}

const unitSchemaResolver = {
  order: 1,
  canRead: function(file: AnyAction) {
      return file.url.indexOf(unitSchemaIdentifier) !== -1;
  },
  read: function() {
      return JSON.stringify(unitSchema)
  }
}

// configuration object for JSONForms
const jsonFormsConfiguration = {
  ajv: ajv,
  refParserOptions: {
    resolve: {
      foo: contextSchemaResolver,
      bar: unitSchemaResolver
    } as any
  }
}

// Add configuration to JSONForms
store.dispatch(
  Actions.init(
    data,
    valueSchema,
    uischema,
    jsonFormsConfiguration
  )
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
