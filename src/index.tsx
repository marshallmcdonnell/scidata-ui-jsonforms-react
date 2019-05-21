import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SciDataFormContainer from './views/containers/scidataForm';
import { Provider } from 'react-redux';
import { JsonFormsState } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';

import configureStore from './state/store';


const sciDataInitialState: JsonFormsState = {
  jsonforms: {
    cells: materialCells,
    renderers: materialRenderers
  }
};

/*
const initialState = {
  sciDataState: sciDataInitialState
}
*/

const store = configureStore(sciDataInitialState);


ReactDOM.render(
  <Provider store={store}>
    <SciDataFormContainer />
  </Provider>,
  document.getElementById('root')
);

