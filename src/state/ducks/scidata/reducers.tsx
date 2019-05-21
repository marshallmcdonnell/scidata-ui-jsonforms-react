import { combineReducers} from 'redux';
import { jsonformsReducer } from '@jsonforms/core';

const reducer = combineReducers({ 
        jsonforms: jsonformsReducer()
});

export default reducer;
