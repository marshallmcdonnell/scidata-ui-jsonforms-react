import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { combineReducers, createStore, Reducer, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import colourSchema from './schema/example_definitions_colours.json';
import shapeSchema from './schema/example_definitions_shapes.json';
import schema from './schema/example_schema.json';
import uischema from './uischema/example_uischema.json';
import { Actions, jsonformsReducer, JsonFormsState, createAjv } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';

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

const colourSchemaIdentifier = 'example_definitions_colours.json';
const shapeSchemaIdentifier = 'example_definitions_shapes.json';

ajv.addSchema(colourSchema, colourSchemaIdentifier);
ajv.addSchema(shapeSchema, shapeSchemaIdentifier);

const rootReducer: Reducer<JsonFormsState, AnyAction> = combineReducers({ jsonforms: jsonformsReducer() });
const store = createStore(rootReducer, initState);

// Allow json-schema-ref-resolver to resolve same schema
const colourSchemaResolver = {
  order: 1,
  canRead: function(file: AnyAction) {
      return file.url.indexOf(colourSchemaIdentifier) !== -1;
  },
  read: function() {
      return JSON.stringify(colourSchema)
  }
}

const shapeSchemaResolver = {
  order: 1,
  canRead: function(file: AnyAction) {
      return file.url.indexOf(shapeSchemaIdentifier) !== -1;
  },
  read: function() {
      return JSON.stringify(shapeSchema)
  }
}

// configuration object for JSONForms
const jsonFormsConfiguration = {
  ajv: ajv,
  refParserOptions: {
    resolve: {
      foo: colourSchemaResolver,
      bar: shapeSchemaResolver
    } as any
  }
}
// Add configuration to JSONForms
store.dispatch(
  Actions.init(
    data,
    schema,
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
