import React, { useState, useEffect } from 'react';
// material
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// elements
// import socketIOClient from 'socket.io-client';
import { Link } from '../../../elements';

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
    <Link href="/noti">
      <Badge badgeContent={4} color="secondary">
        <NotificationsNoneIcon />
      </Badge>
    </Link>
  );
};

export default NotiBadge;
