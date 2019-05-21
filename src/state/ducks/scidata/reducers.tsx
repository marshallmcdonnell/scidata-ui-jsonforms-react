import { combineReducers, Reducer, AnyAction } from 'redux';
import { jsonformsReducer, JsonFormsState } from '@jsonforms/core';

/*
const scidataState: JsonFormsState = {
    jsonforms: {
      cells: materialCells,
      renderers: materialRenderers
    }
  };
*/

const reducer: Reducer<JsonFormsState, AnyAction> = combineReducers({ 
        jsonforms: jsonformsReducer()
});

export default reducer;
