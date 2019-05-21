import { createStore, combineReducers } from "redux";
import { Actions } from '@jsonforms/core';
import * as reducers from "./ducks";


import scidataJsonSchema from './ducks/scidata/jsonSchema.json';
import scidataUiSchema from './ducks/scidata/uiSchema.json';
import { default as scidataJsonFormsConfiguration} from './ducks/scidata/config'

export default function configureStore( initialState ) {
    const rootReducer = combineReducers( reducers );

    const store = createStore(
        rootReducer,
        initialState,
    );
       
    const data = {};
    
    store.dispatch(
      Actions.init(
        data,
        scidataJsonSchema,
        scidataUiSchema,
        scidataJsonFormsConfiguration
      )
    )

    return store;
}