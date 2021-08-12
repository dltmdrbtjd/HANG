import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// material
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// history
import socketIOClient from 'socket.io-client';
import { history } from '../../../redux/configureStore';
// elements
import { Button, Grid } from '../../../elements';
// userInfo
import { getUserInfo } from '../../../shared/userInfo';
import './style.css';
// api
import apis from '../../../shared/api';

const NotiBadge = () => {
  const [newAlarm, setNewAlarm] = useState(false);
  const ENDPOINT = 'https://soujinko.shop/';
  const socket = socketIOClient(ENDPOINT);
  const userPk = getUserInfo() && getUserInfo().userPk;

  const NotiOff = () => {
    setNewAlarm(false);
    history.push('/noti');
  };

  apis
    .AlarmCheck()
    .then(res => {
      setNewAlarm(res.data);
    })
    .catch(err => console.log(err));

  useEffect(() => {
    socket.emit('login', { uid: userPk });
    socket.on('requested', data => {
      setNewAlarm(data);
      console.log(data);
    });
  }, []);

  return (
    <Button _onClick={NotiOff} form="text">
      <Grid>
        <Badge
          invisible={newAlarm ? false : 'invisible'}
          variant="dot"
          overlap="circular"
          color="secondary"
        >
          <NotificationsNoneIcon />
        </Badge>
      </Grid>
    </Button>
  );
};

export default NotiBadge;
