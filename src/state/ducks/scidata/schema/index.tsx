import contextSchema from './context.json';
import datasetSchema from './dataset.json';
import measurementSchema from './measurement.json';
import methodologySchema from './methodology.json';
import parameterSchema from './parameter.json';
import resourceSchema from './resource.json';
import unitSchema from './unit.json';
import valueSchema from './value.json';

const schemas = {
    context: contextSchema,
    dataset: datasetSchema,
    measurement: measurementSchema,
    methodology: methodologySchema,
    parameter: parameterSchema,
    resource: resourceSchema,
    unit: unitSchema,
    value: valueSchema,
}

export default schemas;