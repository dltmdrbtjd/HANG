import React from 'react';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, Text, Strong } from '../../../elements';
// components
import ProfileImage from '../../../components/ProfileImg';
import GuideNameplate from '../../../components/GuideNameplate';

const AlarmCard = ({ userInfo }) => {
  return (
    <Grid
      padding="20px 0"
      isFlex
      ver="center"
      border="1px solid #E7E7E7"
      borDirection="bottom"
      _onClick={() => history.push('/mypage')}
    >
      <ProfileImage imgUrl={userInfo.profileImg} />

      <Text width="auto" margin="0 0 0 15px" overflow="visible">
        <Strong fw="bold">{userInfo.nickname}</Strong>님이{' '}
        <GuideNameplate>{userInfo.guide ? '길잡이' : '길잡이'}</GuideNameplate>
        {userInfo.guide ? '를 해준대요 !' : '를 해줄래요 ?'}
      </Text>
    </Grid>
  );
};

export default AlarmCard;
