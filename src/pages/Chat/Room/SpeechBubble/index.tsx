import React from 'react';
// elements
import { Text, Grid } from '../../../../elements';
// style
import { SpeechBubbleStyle } from './style';

const SpeechBubble = ({ person, next, children }) => {
  return (
    <Grid
      isFlex
      hoz={person && 'flex-end'}
      margin={next ? '0 0 8px' : '0 0 16px'}
    >
      <Text
        padding="16px"
        color={person ? 'white' : 'black'}
        addstyle={SpeechBubbleStyle(person)}
      >
        {children}
      </Text>
    </Grid>
  );
};

export default SpeechBubble;
