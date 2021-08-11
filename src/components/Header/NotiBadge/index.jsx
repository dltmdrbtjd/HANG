import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// material
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// history
import socketIOClient from 'socket.io-client';
import { history } from '../../../redux/configureStore';
// elements
import { Button } from '../../../elements';

const ENDPOINT = 'https://soujinko.shop/';

const NotiBadge = () => {
  const userPk = Number(localStorage.getItem('userPk'));

  const [connected, setConnected] = useState(false);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit('login', { uid: userPk });
  }, []);

  return (
    <Button _onClick={() => history.push('/noti')} form="text">
      <Badge badgeContent={4} color="secondary">
        <NotificationsNoneIcon />
      </Badge>
    </Button>
  );
};

export default NotiBadge;
