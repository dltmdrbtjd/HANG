import React from 'react';
// elements
import { Grid, Link, Strong, Text } from '../../../elements';
// components
import ProfileImg from '../../../components/ProfileImg';
// style
import { BorderBottom, LimitWidth, ShowTimeSpan } from './style';

const ChatCard = () => {
  return (
    <Grid addstyle={BorderBottom} padding="24px 0">
      <Link href="/chat/room" width="100%" hoz="space-between" ver="center">
        <Grid display="flex" width="80%">
          <ProfileImg />

          <Grid margin="0 0 0 24px" overflow="hidden" addstyle={LimitWidth}>
            <Strong fw="bold" fs="la">
              닉네임
            </Strong>

            <Text margin="6px 0 0" ws="nowrap">
              마지막 채팅 내용11111111111111111111111111111
            </Text>
          </Grid>
        </Grid>

        <ShowTimeSpan>00:00</ShowTimeSpan>
      </Link>
    </Grid>
  );
};

export default ChatCard;
