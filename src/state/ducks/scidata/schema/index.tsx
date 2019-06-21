import contextSchema from "./context.json";
import datasetSchema from "./dataset.json";
import measurementSchema from "./measurement.json";
import methodologySchema from "./methodology.json";
import parameterSchema from "./parameter.json";
import resourceSchema from "./resource.json";
import scidataSchema from "./scidata.json";
import unitSchema from "./unit.json";
import valueSchema from "./value.json";

export const schemas = {
  context: contextSchema,
  dataset: datasetSchema,
  measurement: measurementSchema,
  methodology: methodologySchema,
  parameter: parameterSchema,
  resource: resourceSchema,
  scidata: scidataSchema,
  unit: unitSchema,
  value: valueSchema
};

export const schemaList = Object.keys(schemas).filter(
  (value) => value !== "context"
);
