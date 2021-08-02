import React from 'react';
// elements
import { Grid, Link, Text, Strong } from '../../../elements';
// components
import ProfileImage from '../../../components/ProfileImg';
// style
import { AlarmWrapperStyle, StrongAddStyle } from './style';

const AlarmCard = () => {
  return (
    <Link href="/mypage" width="100%">
      <Grid
        padding="20px 0"
        display="flex"
        ver="center"
        addstyle={AlarmWrapperStyle}
      >
        <ProfileImage />

        <Text margin="0 0 0 15px" overflow="visible">
          <Strong>닉네임</Strong> 님이{' '}
          <Strong addstyle={StrongAddStyle}>길잡이</Strong>를 부탁합니다
        </Text>
      </Grid>
    </Link>
  );
};

export default AlarmCard;
