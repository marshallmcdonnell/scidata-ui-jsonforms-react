import React from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import createStyles from "@material-ui/core/styles/createStyles";
import { WithStyles } from "@material-ui/core/styles/withStyles";

import './scidataForm.css';

export const SciDataFormStyle = createStyles({
  container: {
    padding: '1em'
  },
  title: {
    textAlign: 'center',
    padding: '0.25em'
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
  },
  demoform: {
    margin: 'auto'
  }
});

export interface SciDataFormProps extends WithStyles<typeof SciDataFormStyle> {
    dataAsString: string;
}
  
class SciDataForm extends React.Component<SciDataFormProps, any> {

    render() {
        const { classes, dataAsString } = this.props;
        return (
        <div>
            <div className="scidataForm">
            <header className="scidataForm-header">
                <h1 className="scidataForm-title">JSON Forms for SciData</h1>
            </header>
            </div>

            <Grid container justify={'center'} spacing={24} className={classes.container}>
            <Grid item sm={6}>
                <Typography
                variant={'display1'}
                className={classes.title}
                >
                Data State
                </Typography>
                <div className={classes.dataContent}>
                <pre>{dataAsString}</pre>
                </div>
            </Grid>
            <Grid item sm={6}>
                <Typography
                variant={'display1'}
                className={classes.title}
                >
                Form for Data Input
                </Typography>
                <div className={classes.demoform}>
                <JsonForms/>
                </div>
            </Grid>
            </Grid>
        </div>
        );
    }
}

export default SciDataForm;

