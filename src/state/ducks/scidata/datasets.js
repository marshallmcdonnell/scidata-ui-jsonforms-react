
import schemas from './schema';
import uischemas from './uischema';
import schemaList from './constants/schemaList';

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