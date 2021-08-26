import React from 'react';
// global state
import { signInStatus } from 'src/globalState/signInStatus';
// material
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// history
// import socket from 'src/util/socket';
import io from 'socket.io-client';
import { history } from '../../../redux/configureStore';
// elements
import { Button, Grid } from '../../../elements';
// userInfo
import { getUserInfo } from '../../../shared/userInfo';
import './style.css';
// api
import apis from '../../../shared/api';

const NotiBadge = () => {
  const [newAlarm, setNewAlarm] = React.useState<boolean>(false);

  const { isLogIn } = React.useContext(signInStatus);
  const ENDPOINT = 'https://soujinko.shop';
  const socket = io(ENDPOINT);

  const userPk = isLogIn && getUserInfo('userInfo').userPk;

  const NotiOff = () => {
    setNewAlarm(false);
    history.push('/noti');
  };

  React.useEffect(() => {
    if (isLogIn) {
      socket.emit('login', { uid: userPk });
      socket.on('requested', (data) => {
        setNewAlarm(data);
      });

      apis
        .AlarmCheck()
        .then((res) => {
          setNewAlarm(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isLogIn]);

  return (
    <Button form="text" arialabel="badge">
      <Grid>
        <Badge
          invisible={!newAlarm}
          variant="dot"
          overlap="circular"
          color="secondary"
          onClick={NotiOff}
        >
          <NotificationsNoneIcon />
        </Badge>
      </Grid>
    </Button>
  );
};

export default NotiBadge;
