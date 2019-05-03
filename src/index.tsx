import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { combineReducers, createStore, Reducer, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import schema from './schema.json';
import uischema from './uischema.json';
import { Actions, jsonformsReducer, JsonFormsState, createAjv } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';


const data = {
    "@context": [
        "https://stuchalk.github.io/scidata/contexts/scidata.jsonld",
        {
            "sci": "http://stuchalk.github.io/scidata/ontology/scidata.owl#",
            "sub": "http://stuchalk.github.io/scidata/ontology/substance/substance.owl#",
            "chm": "http://stuchalk.github.io/scidata/ontology/chemical/chemical.owl#",
            "prop": "http://stuchalk.github.io/scidata/ontology/property/property.owl#",
            "qudt": "http://www.qudt.org/qudt/owl/1.0.0/unit.owl#",
            "obo": "http://purl.obolibrary.org/obo/",
            "dc": "http://purl.org/dc/terms/",
            "xsd": "http://www.w3.org/2001/XMLSchema#"
        },
        {"@base": "http://stuchalk.github.io/scidata/examples/ph.jsonld/"}
    ],
    "@id": "",
    "uid": "scidata/example/ph",
    "title": "pH of cyanide standard",
    "author": [{
        "@id": "author/1/",
        "@type": "dc:creator",
        "name": "Stuart Chalk",
        "organization": "University of North Florida (UNF)",
        "email": "schalk@unf.edu",
        "orcid": "0000-0002-0703-7776"
    }],
    "description": "Determination of the pH of a 3 ppm cyanide solution after complete reaction",
    "publisher": "Chalk Group, Department of Chemistry, University of North Florida",
    "version": 1,
    "keywords": [
        "Cyanide",
        "pH",
        "Example Data"
    ],
    "permalink": "http://stuchalk.github.io/scidata/examples/ph.jsonld",
    "related": [
        "http://stuchalk.github.io/scidata/examples/ri.jsonld",
        "http://stuchalk.github.io/scidata/examples/nmr.jsonld",
        "http://stuchalk.github.io/scidata/examples/scf.jsonld"
    ],
    "toc": {
        "@id": "toc",
        "@type": "dc:tableOfContents",
        "sections": [
            "methodology/",
            "system/",
            "dataset/",
            "measurement/1/",
            "procedure/1/",
            "substance/1/",
            "compound/1/",
            "compound/2/",
            "compound/3/",
            "compound/4/",
            "compound/5/",
            "compound/6/",
            "condition/1/",
            "datapoint/1/",
            "datapoint/2/"
        ]
    },
    "scidata": {
        "@id": "scidata/",
        "@type": "sci:scientificData",
        "type": ["property value"],
        "property": ["pH"],
        "kind": ["datapoint"],
        "methodology": {
            "@id": "methodology/",
            "@type": "sci:methodology",
            "evaluation": ["experimental"],
            "aspects": [
                {
                    "@id": "measurement/1/",
                    "@type": "cao:CAO_000152",
                    "scope": "resource/1/",
                    "techniqueType": "cao:electrochemistry",
                    "technique": "cao:potentiometry",
                    "instrumentType": "Temperature compensated pH electrode",
                    "settings": [{
                        "@id": "setting/1/",
                        "@type": "sci:setting",
                        "quantity": "instrument feature",
                        "property": "Temperature compensation",
                        "text": {
                            "@id": "setting/1/value/",
                            "@type": "sci:textvalue",
                            "text": "true"
                        }
                    }]
                },
                {
                    "@id": "resource/1/",
                    "@type": "sci:resource",
                    "type": "instrument",
                    "name": "Accumet Liquid-Filled pH/ATC Epoxy Body Combination Electrode",
                    "vendor": "Fisher Scientific",
                    "catalognumber": "13-620-530A"
                },
                {
                    "@id": "procedure/1/",
                    "@type": "sci:procedure",
                    "description": "The pH electrode was calibrated. "
                }
            ]
        },
        "system": {
            "@id": "system/",
            "@type": "sci:system",
            "discipline": "chemistry",
            "subdiscipline": "analytical chemistry",
            "facets": [
                {
                    "@id": "substance/1/",
                    "@type": "sub:substance",
                    "title": "3 ppm cyanide standard solution",
                    "aggregation": "sub:aq",
                    "mixtype": "sub:homogeneousSolution",
                    "phase": "sub:liquid",
                    "constituents": [
                        {
                            "@id": "substance/1/constituent/1/",
                            "@type": "sci:chemical",
                            "source": "compound/1/",
                            "role": "chm:analyte",
                            "properties": [{
                                "@id": "substance/1/constituent/1/property/1/",
                                "@type": "prop:concentrationMassVolume",
                                "quantity": "mass of substance per volume",
                                "property": "Concentration (w/v)",
                                "value": {
                                    "@id": "substance/1/constituent/1/property/1/value/",
                                    "@type": "sci:value",
                                    "number": 2.99,
                                    "unitref": "qudt:PpmWeightVolume"
                                }
                            }]
                        },
                        {
                            "@id": "substance/1/constituent/2/",
                            "@type": "sci:chemical",
                            "source": "compound/2/",
                            "role": "chm:reagent"
                        },
                        {
                            "@id": "substance/1/constituent/3/",
                            "@type": "sci:chemical",
                            "source": "compound/3/",
                            "role": "chm:reagent"
                        },
                        {
                            "@id": "substance/1/constituent/4/",
                            "@type": "sci:chemical",
                            "source": "compound/4/",
                            "role": "chm:buffer"
                        },
                        {
                            "@id": "substance/1/constituent/5/",
                            "@type": "sci:chemical",
                            "source": "compound/5/",
                            "role": "chm:solvent"
                        },
                        {
                            "@id": "substance/1/constituent/6/",
                            "@type": "sci:chemical",
                            "source": "compound/6/",
                            "role": "chm:solvent"
                        }
                    ],
                    "properties": [{
                        "@id": "mixture/1/property/1/",
                        "@type": "prop:volume",
                        "quantity": "volume",
                        "property": "Volume of solution",
                        "value": {
                            "@id": "mixture/1/property/1/value/",
                            "@type": "sci:value",
                            "number": 100,
                            "unitref": "qudt:MilliLiter"
                        }
                    }]
                },
                {
                    "@id": "compound/1",
                    "@type": "sci:compound",
                    "name": "cyanide ion",
                    "inchi": "InChI=1S/CN/c1-2/q-1",
                    "chebi": "obo:CHEBI_17514"
                },
                {
                    "@id": "compound/2",
                    "@type": "sci:compound",
                    "name": "phenolphthlin",
                    "inchi": "InChI=1S/C6H6O/c7-6-4-2-1-3-5-6/h1-5,7H",
                    "chebi": "obo:CHEBI_34915"
                },
                {
                    "@id": "compound/3",
                    "@type": "sci:compound",
                    "name": "copper(II) ion",
                    "inchi": "InChI=1S/Cu/q+2",
                    "chebi": "obo:CHEBI_29036"
                },
                {
                    "@id": "compound/4",
                    "@type": "sci:compound",
                    "name": "tetraborate ion",
                    "inchi": "InChI=1S/B4H4O9/c5-1-9-3(7)11-2(6)12-4(8,10-1)13-3/h5-8H/q-2",
                    "chebi": "obo:CHEBI_38889"
                },
                {
                    "@id": "compound/5",
                    "@type": "sci:compound",
                    "name": "ethanol",
                    "inchi": "InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3",
                    "chebi": "obo:CHEBI_16236"
                },
                {
                    "@id": "compound/6",
                    "@type": "sci:compound",
                    "name": "water",
                    "inchi": "InChI=1S/H2O/h1H2",
                    "chebi": "obo:CHEBI_15377"
                },
                {
                    "@id": "condition/1/",
                    "@type": "sci:condition",
                    "source": "measurement/1/",
                    "scope": "substance/1/",
                    "quantity": "temperature",
                    "property": "Temperature of the experiment",
                    "propertyref": "prop:temperature",
                    "value": {
                        "@id": "condition/1/value/",
                        "@type": "sci:value",
                        "number": "22.8",
                        "unitref": "qudt:DegreeCelcius"
                    }
                }
            ]
        },
        "dataset": {
            "@id": "dataset/",
            "@type": "sci:dataset",
            "source": "measurement/1/",
            "scope": "substance/1/",
            "datapoint": [
                {
                    "@id": "datapoint/1/",
                    "@type": "sci:datapoint",
                    "quantity": "p-function negative log of value",
                    "property": "pH",
                    "propertyref": "prop:pH",
                    "conditions": ["condition/1/"],
                    "value": {
                        "@id": "datapoint/1/value/",
                        "@type": "sci:value",
                        "number": "10.03"
                    }
                },
                {
                    "@id": "datapoint/2/",
                    "@type": "sci:datapoint",
                    "quantity": "annotation",
                    "property": "Observation",
                    "textstring": {
                        "@id": "datapoint/2/value/",
                        "@type": "sci:textvalue",
                        "text": "The solution was clear, no reagent precipitation was observed.",
                        "texttype": "plain",
                        "language": "en-us"
                    }
                }
            ]
        }
    },
    "references": [{
        "@id": "reference/1/",
        "@type": "dc:source",
        "citation": "Chalk Research Group http://chalk.coas.unf.edu",
        "url": "http://stuchalk.github.io/scidata/examples/ph.jsonld"
    }],
    "rights": {
        "@id": "rights",
        "@type": "dc:rights",
        "license": "http://creativecommons.org/publicdomain/zero/1.0/"
    }
};

const initState: JsonFormsState = {
    jsonforms: {
      cells: materialCells,
      renderers: materialRenderers
    }
}

const rootReducer: Reducer<JsonFormsState, AnyAction> = combineReducers({ jsonforms: jsonformsReducer() });
const store = createStore(rootReducer, initState);

const ajv = createAjv({
    useDefaults: true
})

store.dispatch(Actions.init(data, schema, uischema, ajv));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
