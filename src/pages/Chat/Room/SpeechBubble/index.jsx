import React from 'react';
// elements
import { Text, Grid } from '../../../../elements';
// style
import { SpeechBubbleStyle, TabSpeechBubble } from './style';

const SpeechBubble = ({ person, children }) => {
  return (
    <Grid isFlex hoz={person && 'flex-end'} margin="0 0 16px">
      <Text
        padding="16px"
        color={person ? 'white' : 'black'}
        person={person}
        addstyle={SpeechBubbleStyle}
        tab={TabSpeechBubble}
      >
        {children}
      </Text>
    </Grid>
  );
};

export default SpeechBubble;
