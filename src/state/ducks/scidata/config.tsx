import { createAjv } from '@jsonforms/core';

import contextSchema from './schemas/context.json';
import unitSchema from './schemas/unit.json';

import { contextSchemaIdentifier, contextSchemaResolver } from './context/resolver'
import { unitSchemaIdentifier, unitSchemaResolver } from './unit/resolver'

const ajv = createAjv({
    useDefaults: true
  })
  ajv.addSchema(contextSchema, contextSchemaIdentifier);
  ajv.addSchema(unitSchema, unitSchemaIdentifier);
  
  const jsonFormsConfiguration = {
    ajv: ajv,
    refParserOptions: {
      resolve: {
        foo: contextSchemaResolver,
        bar: unitSchemaResolver
      } as any
    }
  }

  export default jsonFormsConfiguration;