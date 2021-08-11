import React from 'react';
// icon
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
// history
import { history } from '../../redux/configureStore';
// elements
import { Grid, Button, Text, MainTitle } from '../../elements';
// style
import TabFontSize from './style';

const NoPosts = ({ list, title, coment, link, children, ...props }) => {
  if (list.length) return <>{children}</>;

  return (
    <Grid
      color="darkG"
      bgColor="white"
      radius="14px"
      padding="20px"
      isFlex
      ver="center"
      {...props}
      _onClick={() => history.push(link)}
    >
      <Button
        fs="la"
        fw="bold"
        width="50px"
        height="50px"
        radius="50%"
        padding="0"
        _onClick={() => history.push(link)}
        margin="0 30px 0 0"
      >
        <FlightTakeoffIcon />
      </Button>

      <Grid addstyle="flex: 1">
        <MainTitle fs="lg" margin="0 0 15px" tab={TabFontSize('la')}>
          {title}
        </MainTitle>

        <Text wb="keep-all" fs="sm" tab={TabFontSize('lg')}>
          {coment}
        </Text>
      </Grid>
    </Grid>
  );
};

export default NoPosts;
