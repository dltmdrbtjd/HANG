import React from 'react';
// redux
import { useDispatch } from 'react-redux';
import { ChooseChatRoom } from 'src/redux/modules/ChatModule/chat';
// style
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, Strong, Text, Span } from '../../../elements';
// components
import ProfileImg from '../../../components/ProfileImg';
// reducer
import { LimitWidth, BackgroundOpacity } from './style';

const ChatCard = ({
  targetUserPk,
  profileImg,
  nickname,
  message,
  unchecked,
  time,
}) => {
  const dispatch = useDispatch();
  const chooseChatRoom = () => {
    dispatch(ChooseChatRoom({ nickname, profileImg, targetPk: targetUserPk }));
    history.push(`/chat/room?number=${targetUserPk}`);
  };

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
            <ProfileImg imgUrl={profileImg} />

            <Grid margin="0 0 0 24px" addstyle={LimitWidth}>
              <Strong fw="bold" fs="la">
                {nickname}
              </Strong>

              {message ? <Text margin="6px 0 0">{message}</Text> : null}
            </Grid>
          </Grid>

          <Grid width="auto" isFlex ver="flex-end" column>
            {time ? (
              <Span fs="xs" lh="24px">
                {time}
              </Span>
            ) : null}

            {unchecked ? (
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
                {unchecked < 10 ? unchecked : '9+'}
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

export default ChatCard;
