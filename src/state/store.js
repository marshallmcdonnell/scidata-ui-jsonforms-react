import { createStore } from "redux";
import { Actions } from "@jsonforms/core";

//import * as reducers from "./ducks";
import { default as rootReducer } from "./ducks/scidata";

import { default as scidataJsonFormsConfiguration } from "./ducks/scidata/config";

export default function configureStore(initialState) {
  //const rootReducer = combineReducers( reducers );

  const store = createStore(rootReducer, initialState);
  console.log(store.getState());

  // Combine sub-schema to single for intial store
  const data = {};
  const schema = {};
  const uischema = {};

  store.dispatch(
    Actions.init(data, schema, uischema, scidataJsonFormsConfiguration)
  );

  return store;
}
