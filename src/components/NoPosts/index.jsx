import React from 'react';
// icon
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
// history
import { history } from '../../redux/configureStore';
// elements
import { Grid, Button, Text } from '../../elements';

const NoPosts = ({ list, coment, btnComent, link, children, ...props }) => {
  if (list.length) return <>{children}</>;

  return (
    <Grid color="darkG" bgColor="white" radius="14px" padding="20px" {...props}>
      <Text fs="la" margin="0 0 16px" textAlign="center">
        {coment}
      </Text>

      <Button
        fs="la"
        fw="bold"
        width="100%"
        _onClick={() => history.push(link)}
      >
        {btnComent} <FlightTakeoffIcon style={{ marginLeft: '8px' }} />
      </Button>
    </Grid>
  );
};

export default NoPosts;
