
import { schemas, schemaList } from './schema';
import uischemas from './uischema';

function createSchemaDataset(name, schema, uischema) {
    return {
        name: name,
        path: name,
        title: name,
        schema: schema,
        uischema: uischema,
        data: {}
    }
}

const datasets = schemaList.map(name => createSchemaDataset(name, schemas[name], uischemas[name]));

export default datasets;