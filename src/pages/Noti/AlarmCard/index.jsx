import React from 'react';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, Text, Strong } from '../../../elements';
// components
import ProfileImage from '../../../components/ProfileImg';
// style
import { AlarmWrapperStyle, StrongAddStyle } from './style';

const AlarmCard = () => {
  return (
    <Grid
      padding="20px 0"
      isFlex
      ver="center"
      addstyle={AlarmWrapperStyle}
      _onClick={() => history.push('/mypage')}
    >
      <ProfileImage />

      <Text margin="0 0 0 15px" overflow="visible">
        <Strong>닉네임</Strong> 님이{' '}
        <Strong addstyle={StrongAddStyle}>길잡이</Strong>를 부탁합니다
      </Text>
    </Grid>
  );
};

export default AlarmCard;
