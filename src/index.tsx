import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { combineReducers, createStore, Reducer, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import schema from './schema/scidata_unit.json';
import uischema from './uischema/scidata_unit.json';
import { Actions, jsonformsReducer, JsonFormsState, createAjv } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';


const data = {};

const initState: JsonFormsState = {
    jsonforms: {
      cells: materialCells,
      renderers: materialRenderers
    }
}

const rootReducer: Reducer<JsonFormsState, AnyAction> = combineReducers({ jsonforms: jsonformsReducer() });
const store = createStore(rootReducer, initState);

const ajv = createAjv({
    useDefaults: true
})

store.dispatch(Actions.init(data, schema, uischema, ajv));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
