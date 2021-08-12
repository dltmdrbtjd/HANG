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
import './style.css';
// api
import apis from '../../../shared/api';

const NotiBadge = () => {
  const [newAlarm, setNewAlarm] = useState(false);
  const ENDPOINT = 'https://soujinko.shop/';
  const socket = socketIOClient(ENDPOINT);
  const userPk = JSON.parse(localStorage.getItem('userInfo')).userPk;

  const NotiOff = () => {
    setNewAlarm(false);
    history.push('/noti');
  };

  apis
    .AlarmCheck()
    .then(res => {
      console.log(newAlarm);
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
          invisible={newAlarm ? '' : 'invisible'}
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
