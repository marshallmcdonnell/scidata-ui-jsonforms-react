import { createAjv } from "@jsonforms/core";
import schemas from './schema';
import schemaList from './constants/schemaList';

function generateSchemaResolver(name, schema) {
  return {
    order: 1,
    canRead: function(file) {
        return file.url.indexOf(name + '.json') !== -1;
    },
    read: function() {
        return JSON.stringify(schema)
    }
  }
}

// Combined schema validator and schema resolver
const ajv = createAjv({useDefaults: true});
var resolvers = {'context': generateSchemaResolver('context', schemas['context'])};
for( var i = 0; i < schemaList.length; i++) {
  const name = schemaList[i];
  ajv.addSchema(schemas[name], name + '.json');
  resolvers[name] = generateSchemaResolver(name, schemas[name]);
}

console.log("resolvers:", resolvers)

// JSONForms configuration for Redux Store
const jsonFormsConfiguration = {
  ajv: ajv,
  refParserOptions: {
    resolve: { resolvers }
  }
};

export default jsonFormsConfiguration;
