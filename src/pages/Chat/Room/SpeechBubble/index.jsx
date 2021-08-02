import React from 'react';
// elements
import { Text, Grid } from '../../../../elements';
// style
import SpeechBubbleStyle from './style';

const SpeechBubble = ({ person }) => {
  return (
    <Grid display="flex" hoz={person === 'me' && 'flex-end'} margin="0 0 16px">
      <Text
        width="auto"
        padding="16px"
        color={person === 'me' ? 'white' : 'black'}
        person={person}
        addstyle={SpeechBubbleStyle}
      >
        안녕하세요
      </Text>
    </Grid>
  );
};

SpeechBubble.propTypes = {};

export default SpeechBubble;
