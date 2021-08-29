import React from 'react';
// user info
import { setUserInfo } from 'src/shared/userInfo';
// history
import { history } from '../../../redux/configureStore';
// type
import { LastChat } from '../../../redux/modules/ChatModule/type';
// function
import timeFormat from '../../../util/timeFormat';
// elements
import { Grid, Strong, Text, Span } from '../../../elements';
// components
import ProfileImg from '../../../components/ProfileImg';
// reducer
import BackgroundOpacity from './style';
import { textOverflow } from '../../../styles/Mixin';

const ChatCard = ({ roomInfo }) => {
  const chooseChatRoom = () => {
    setUserInfo('targetUserInfo', {
      nickname: roomInfo.nickname,
      profileImg: roomInfo.profileImg,
      targetPk: roomInfo.targetPk,
    });

    history.push('/chat/room');
  };
  const lastChat: LastChat = roomInfo.lastChat[0];

  return (
    <Grid position="relative" cursor="pointer" _onClick={chooseChatRoom}>
      <Grid
        border="0.5px solid #E7E7E7"
        borDirection="bottom"
        padding="24px 0"
        position="relative"
        z="1"
        bgColor="bgColor"
      >
        <Grid isFlex hoz="space-between">
          <Grid isFlex width="80%">
            <ProfileImg imgUrl={roomInfo.profileImg} />

            <Grid
              width="calc(100% - 84px)"
              margin="0 0 0 24px"
              addstyle={textOverflow()}
            >
              <Strong fw="bold" fs="la">
                {roomInfo.nickname}
              </Strong>

              <Text margin="6px 0 0" addstyle={textOverflow()}>
                {lastChat
                  ? lastChat.message
                  : `${roomInfo.nickname} 님과 채팅을 시작해보세요`}
              </Text>
            </Grid>
          </Grid>

          <Grid width="auto" isFlex ver="flex-end" column>
            {lastChat ? (
              <Span fs="xs" lh="24px">
                {timeFormat(lastChat.curTime)}
              </Span>
            ) : null}

            {roomInfo.unchecked ? (
              <Span
                fs="xs"
                isFlex
                hoz="center"
                ver="center"
                width="23px"
                height="23px"
                radius="50%"
                bgColor="brandColor"
                color="white"
                margin="6px 0 0"
              >
                {roomInfo.unchecked < 10 ? roomInfo.unchecked : '9+'}
              </Span>
            ) : null}
          </Grid>
        </Grid>
      </Grid>

      <Grid
        position="absolute"
        top="0"
        right="1px"
        z="0"
        width="105px"
        height="100%"
        isFlex
        ver="center"
        addstyle={BackgroundOpacity}
      >
        <Text color="danger" textAlign="center">
          나가기
        </Text>
      </Grid>
    </Grid>
  );
};

export default React.memo(ChatCard);
