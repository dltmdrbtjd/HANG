import React from 'react';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, Strong, Text, Span } from '../../../elements';
// components
import ProfileImg from '../../../components/ProfileImg';
// style
import LimitWidth from './style';
import { textOverflow } from '../../../styles/Mixin';

const ChatCard = () => {
  return (
    <Grid border="0.5px solid #E7E7E7" borDirection="bottom" padding="24px 0">
      <Grid
        isFlex
        hoz="space-between"
        ver="center"
        _onClick={() => history.push('/chat/room')}
      >
        <Grid isFlex width="80%">
          <ProfileImg />

          <Grid margin="0 0 0 24px" overflow="hidden" addstyle={LimitWidth}>
            <Strong fw="bold" fs="la">
              닉네임
            </Strong>

            <Text margin="6px 0 0" addstyle={textOverflow()}>
              마지막 채팅 내용11111111111111111111111111111
            </Text>
          </Grid>
        </Grid>

        <Span fs="xs">00:00</Span>
      </Grid>
    </Grid>
  );
};

export default ChatCard;
