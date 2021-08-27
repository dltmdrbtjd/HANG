import React from 'react';
// context
import { chatStatus, ChatLogType } from '../ChatContext';
// user info
import { getUserInfo } from '../../../../shared/userInfo';
// elements
import { Text, Grid } from '../../../../elements';
// style
import { SpeechBubbleStyle } from './style';

const SpeechBubble = () => {
  const { userPk } = getUserInfo('userInfo');
  const { chatLogState } = React.useContext(chatStatus);

  return (
    <>
      {chatLogState.chatLogs.map((chat: ChatLogType, idx: number) => {
        const person = userPk === chat.userPk;
        const next =
          idx < chatLogState.chatLogs.length - 1
            ? chat.userPk === chatLogState.chatLogs[idx + 1].userPk
            : false;

        return (
          <Grid
            isFlex
            hoz={person && 'flex-end'}
            margin={next ? '0 0 8px' : '0 0 16px'}
            key={(Date.now() + Math.random() + idx).toString(36)}
          >
            <Text
              padding="16px"
              color={person ? 'white' : 'black'}
              addstyle={SpeechBubbleStyle(person)}
            >
              {chat.message}
            </Text>
          </Grid>
        );
      })}
    </>
  );
};

export default React.memo(SpeechBubble);
