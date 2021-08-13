import React from 'react';
// moment
import moment from 'moment';
// redux
import { useDispatch } from 'react-redux';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, Strong, Text, Span } from '../../../elements';
// components
import ProfileImg from '../../../components/ProfileImg';
// reducer
import { ChatCreators } from '../../../redux/modules/chat';
// style
import { LimitWidth, BackgroundOpacity } from './style';

const ChatCard = ({
  targetUserPk,
  profileImg,
  nickname,
  message,
  unchecked,
  time,
  quit,
}) => {
  const dispatch = useDispatch();

  const chooseChatRoom = () => {
    dispatch(ChatCreators.ChooseChatRoom({ nickname, profileImg }));
    history.push(`/chat/room?number=${targetUserPk}`);
  };

  return (
    <Grid position="relative" _onClick={chooseChatRoom}>
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
                {moment(time).format('HH:mm')}
              </Span>
            ) : null}

            {unchecked ? (
              <Span
                fs="xs"
                isFlex
                hoz="center"
                ver="center"
                width="20px"
                height="20px"
                radius="50%"
                bgColor="brandColor"
                color="white"
                margin="6px 0 0"
              >
                {unchecked}
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
        _onClick={quit}
      >
        <Text color="danger" textAlign="center">
          나가기
        </Text>
      </Grid>
    </Grid>
  );
};

export default ChatCard;
