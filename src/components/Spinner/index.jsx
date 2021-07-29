import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '../../elements';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <Grid
      display="flex"
      hoz="center"
      ver="center"
      position="fixed"
      top="50%"
      left="50%"
      translate="-50%,-50%"
    >
      <div className={classes.root}>
        <CircularProgress size="100px" />
      </div>
    </Grid>
  );
}
