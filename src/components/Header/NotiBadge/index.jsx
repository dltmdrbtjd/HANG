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

const NotiBadge = () => {
  const userPk = useSelector(state => state.user.userInfo.userPk);
  const ENDPOINT = 'https://soujinko.shop/';
  localStorage.setItem('userPk', userPk);
  const user = localStorage.getItem('userPk');
  console.log(user);
  const socket = socketIOClient(ENDPOINT);
  console.log(userPk);

  useEffect(() => {
    socket.emit('login', { uid: user });
  }, []);

  return (
    <Button _onClick={() => history.push('/noti')} form="text">
      <Badge badgeContent={5} color="secondary">
        <NotificationsNoneIcon />
      </Badge>
    </Button>
  );
};

export default NotiBadge;
