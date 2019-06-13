import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { JsonFormsState } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';

import configureStore from './state/store';
import SciDataTabs from './views/components/SciDataTabs';

import UnitSchema from './state/ducks/scidata/schemas/unit.json';
import UnitUISchema from './state/ducks/scidata/unit/uiSchema.json';
import ValueSchema from './state/ducks/scidata/schemas/value.json';
import ValueUISchema from './state/ducks/scidata/value/uiSchema.json';

const sciDataInitialState: JsonFormsState = {
  jsonforms: {
    cells: materialCells,
    renderers: materialRenderers
  }
};

const store = configureStore(sciDataInitialState);

const datasets = [
  {
    name: "unit",
    path: "unit",
    title: "unit",
    schema: UnitSchema,
    uischema: UnitUISchema,
    data: { "@context": ["http://stuchalk.github.io/scidata/contexts/scidata_unit.jsonld"]}
  },
  {
    name: "value",
    path: "value",
    title: "value",
    schema: ValueSchema,
    uischema: ValueUISchema,
    data: { "@context": ["http://stuchalk.github.io/scidata/contexts/scidata_value.jsonld"]}
  }
]

const App = () => (
  <Provider store={store}>
    <SciDataTabs
      datasets={datasets}
    />
  </Provider>
);


render(<App />, document.getElementById('root'));

