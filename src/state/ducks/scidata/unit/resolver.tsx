import { AnyAction } from 'redux';
import unitSchema from '../schema/unit.json';

export const unitSchemaIdentifier = 'unit.json';

export const unitSchemaResolver = {
  order: 1,
  canRead: function(file: AnyAction) {
      return file.url.indexOf(unitSchemaIdentifier) !== -1;
  },
  read: function() {
      return JSON.stringify(unitSchema)
  }
}