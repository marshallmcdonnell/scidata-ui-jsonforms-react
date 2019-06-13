import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { JsonFormsState } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';

import configureStore from './state/store';
import SciDataTabs from './views/components/SciDataTabs';

import schemas from './state/ducks/scidata/schema';
import uischemas from './state/ducks/scidata/uischema';
import datasets from './state/ducks/scidata/datasets';

console.log(schemas)
console.log(uischemas)

const sciDataInitialState: JsonFormsState = {
  jsonforms: {
    cells: materialCells,
    renderers: materialRenderers
  }
};

const store = configureStore(sciDataInitialState);



const App = () => (
  <Provider store={store}>
    <SciDataTabs
      datasets={datasets}
    />
  </Provider>
);


render(<App />, document.getElementById('root'));

