import React from 'react';
// global state
import { signInStatus } from 'src/context/signInContext';
// material
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// history
import { socket } from 'src/util/socket';
import { history } from '../../../redux/configureStore';
// elements
import { Button, Grid } from '../../../elements';
// userInfo
import { getUserInfo } from '../../../shared/userInfo';
import './style.css';
// api
import apis from '../../../shared/api';

// const socket = React.useContext(SocketContext);

const NotiBadge = () => {
  const [newAlarm, setNewAlarm] = React.useState<boolean>(false);

  const { isLogIn } = React.useContext(signInStatus);
  const userPk = isLogIn && getUserInfo('userInfo').userPk;

  const NotiOff = () => {
    setNewAlarm(false);
    history.push('/noti');
  };

  React.useEffect(() => {
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
  }, [newAlarm]);

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
