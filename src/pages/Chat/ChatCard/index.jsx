import React from 'react';
// redux
import { useDispatch } from 'react-redux';
// moment
import moment from 'moment';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, Strong, Text, Span } from '../../../elements';
// components
import ProfileImg from '../../../components/ProfileImg';
// reducer
import { ChatCreators } from '../../../redux/modules/chat';
// style
import LimitWidth from './style';
import { textOverflow } from '../../../styles/Mixin';

const ChatCard = ({ targetUserPk, profileImg, nickname, message, time }) => {
  const dispatch = useDispatch();

  const chooseChatRoom = () => {
    dispatch(ChatCreators.ChooseChatRoom({ nickname, profileImg }));
    history.push(`/chat/room?number=${targetUserPk}`);
  };

  return (
    <Grid
      border="0.5px solid #E7E7E7"
      borDirection="bottom"
      padding="24px 0"
      _onClick={chooseChatRoom}
    >
      <Grid
        isFlex
        hoz="space-between"
        ver="center"
        _onClick={() => history.push('/chat/room')}
      >
        <Grid isFlex width="80%">
          <ProfileImg imgUrl={profileImg} />

          <Grid margin="0 0 0 24px" overflow="hidden" addstyle={LimitWidth}>
            <Strong fw="bold" fs="la">
              {nickname}
            </Strong>

            <Text margin="6px 0 0" addstyle={textOverflow()}>
              {message}
            </Text>
          </Grid>
        </Grid>

        <Span fs="xs">{moment(time).format('HH:mm')}</Span>
      </Grid>
    </Grid>
  );
};

export default ChatCard;
