import React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// material
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// history
import socketIOClient from 'socket.io-client';
import { history } from '../../../redux/configureStore';
// elements
import { Button, Grid } from '../../../elements';
// userInfo
// import { getUserInfo } from '../../../shared/userInfo';
import './style.css';
// api
// import apis from '../../../shared/api';
// reducer
// import { ChatCreators } from '../../../redux/modules/chat';

interface LastChat {
  message: string;
  curTime: number;
  userPk: number;
}

interface ChatLog {
  lastChat: LastChat[];
  unchecked: string;
  targetPk: number;
}

const NotiBadge = () => {
  const dispatch = useDispatch();

  //   const pkList = useSelector((state) => state.chat.list).map(
  //     (room) => room.targetPk,
  //   );

  const [newAlarm, setNewAlarm] = React.useState<boolean>(false);
  const [chatLog, setChatLog] = React.useState<ChatLog>({});
  const ENDPOINT = 'https://soujinko.shop/';
  const socket = socketIOClient(ENDPOINT);
  //   const userPk = getUserInfo() && getUserInfo().userPk;

  const NotiOff = () => {
    setNewAlarm(false);
    history.push('/noti');
  };

  React.useEffect(() => {
    // socket.emit('login', { uid: userPk });
    socket.on('requested', (data) => {
      setNewAlarm(data);
    });

    apis
      .AlarmCheck()
      .then((res) => {
        setNewAlarm(res.data);
      })
      .catch((err) => console.log(err));

    socket.on('unchecked', () => {
      dispatch(ChatCreators.ChatAlarmCheck(Number(true)));
    });
  }, []);

  React.useEffect(() => {
    socket.on('newMessage', (data) => {
      setChatLog(data);

      dispatch(ChatCreators.ChatHistoryUpdate(data));
    });
  }, [pkList]);

  React.useEffect(() => {
    if (chatLog.userPk && !pkList.includes(chatLog.userPk)) {
      socket.emit('newRoom', { targetPk: chatLog.userPk });
      socket.on('newRoom', (data) => {
        dispatch(
          ChatCreators.CreateChatRoom({
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
    // name="alarm"
    <Button _onClick={NotiOff} form="text">
      <Grid>
        <Badge
          invisible={!newAlarm}
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
