import { AnyAction } from 'redux';
import contextSchema from '../schemas/context.json';

export const contextSchemaIdentifier = 'context.json'; 

export const contextSchemaResolver = {
  order: 1,
  canRead: function(file: AnyAction) {
      return file.url.indexOf(contextSchemaIdentifier) !== -1;
  },
  read: function() {
      return JSON.stringify(contextSchema)
  }
}

