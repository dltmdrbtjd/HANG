import React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// type
import { NewMessage } from 'src/redux/modules/ChatModule/type';
// material
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// history
import socket from 'src/util/socket';
import { history } from '../../../redux/configureStore';
// elements
import { Button, Grid } from '../../../elements';
// userInfo
import { getUserInfo } from '../../../shared/userInfo';
import './style.css';
// api
import apis from '../../../shared/api';
// reducer
import {
  ChatAlarmCheck,
  ChatHistoryUpdate,
  CreateChatRoom,
  getUserPkList,
} from '../../../redux/modules/ChatModule/chat';

const NotiBadge = () => {
  const dispatch = useDispatch();
  const userPkList = useSelector(getUserPkList);

  const [newAlarm, setNewAlarm] = React.useState<boolean>(false);
  const [chatLog, setChatLog] = React.useState<NewMessage>({
    userPk: 0,
    message: '',
    time: 0,
  });

  const userPk = getUserInfo('userInfo') && getUserInfo('userInfo').userPk;

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
  }, []);

  React.useEffect(() => {
    socket.on('unchecked', () => {
      dispatch(ChatAlarmCheck(Number(true)));
    });

    socket.on('newMessage', (data: NewMessage) => {
      setChatLog(data);

      dispatch(ChatHistoryUpdate(data));
    });
  }, []);

  React.useEffect(() => {
    if (chatLog.userPk && !userPkList.includes(chatLog.userPk)) {
      socket.emit('newRoom', { targetPk: chatLog.userPk });
      socket.on('newRoom', (data) => {
        dispatch(
          CreateChatRoom({
            lastChat: [{ message: chatLog.message, curTime: chatLog.time }],
            unchecked: 1,
            targetPk: chatLog.userPk,
            ...data,
          }),
        );
      });
    }
  }, [chatLog]);

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
