import { connect } from 'react-redux';
import {getData, JsonFormsState} from '@jsonforms/core';
import withStyles from "@material-ui/core/styles/withStyles";
import SciDataForm, { SciDataFormStyle } from '../components/scidataForm';

const mapStateToProps = (state: JsonFormsState) => {
  return { dataAsString: JSON.stringify(getData(state), null, 2) }
};

const SciDataFormContainer = connect(mapStateToProps)(withStyles(SciDataFormStyle)(SciDataForm));

export default SciDataFormContainer;