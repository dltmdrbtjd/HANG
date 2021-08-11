import React, { useState, useEffect } from 'react';
// material
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// history
import { history } from '../../../redux/configureStore';
// elements
// import socketIOClient from 'socket.io-client';
import { Button } from '../../../elements';

// const ENDPOINT = 'http://127.0.0.1:4001';

const NotiBadge = () => {
  // const [response, setResponse] = useState('');

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on('FromAPI', data => {
  //     setResponse(data);
  //     console.log(data);
  //   });
  // }, []);

  return (
    <Button _onClick={() => history.push('/noti')} form="text">
      <Badge badgeContent={4} color="secondary">
        <NotificationsNoneIcon />
      </Badge>
    </Button>
  );
};

export default NotiBadge;
