import { createStore } from "redux";
import { Actions } from '@jsonforms/core';

//import * as reducers from "./ducks";
import { default as rootReducer } from './ducks/scidata'


import scidataJsonSchema from './ducks/scidata/jsonSchema.json';
import scidataUiSchema from './ducks/scidata/uiSchema.json';
import { default as scidataJsonFormsConfiguration} from './ducks/scidata/config'


export default function configureStore( initialState ) {
    //const rootReducer = combineReducers( reducers );

    const store = createStore(
        rootReducer,
        initialState,
    );
    console.log(store.getState())
       
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

