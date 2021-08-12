import React from 'react';
// elements
import { Text, Grid } from '../../../../elements';
// style
import { SpeechBubbleStyle, TabSpeechBubble } from './style';

const SpeechBubble = ({ person }) => {
  return (
    <Grid isFlex hoz={person === 'me' && 'flex-end'} margin="0 0 16px">
      <Text
        width="auto"
        padding="16px"
        color={person === 'me' ? 'white' : 'black'}
        person={person}
        addstyle={SpeechBubbleStyle}
        tab={TabSpeechBubble}
      >
        안녕하세요
      </Text>
    </Grid>
  );
};

export default SpeechBubble;
