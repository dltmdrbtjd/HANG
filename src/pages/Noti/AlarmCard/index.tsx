import React from 'react';
// history
import maxWidth from './style';
import { history } from '../../../redux/configureStore';
// elements
import { Grid, Text, Strong } from '../../../elements';
// components
import ProfileImage from '../../../components/ProfileImg';
import GuideNameplate from '../../../components/GuideNameplate';

export interface Props {
  userInfo: {
    checked?: number;
    guide: boolean;
    nickname: string;
    profileImg: string;
  };
}

const AlarmCard = ({ userInfo }: Props) => {
  return (
    <Grid
      padding="20px 0 20px 20px"
      opacity={!userInfo.checked ? '' : '50%'}
      isFlex
      ver="center"
      border="1px solid #E7E7E7"
      borDirection="bottom"
      addstyle={maxWidth}
      _onClick={() => history.push('/mypage/promise')}
    >
      <ProfileImage imgUrl={userInfo.profileImg} />

      <Text width="auto" margin="0 0 0 15px" overflow="visible">
        <Strong fw="bold">{userInfo.nickname}</Strong>
        <Strong fw="md">{userInfo.guide ? '이' : '의'}</Strong>
        <GuideNameplate>{userInfo.guide ? '길잡이' : '길잡이'}</GuideNameplate>
        {userInfo.guide ? '를 해준대요 !' : '를 해줄래요 ?'}
      </Text>
    </Grid>
  );
};

export default AlarmCard;
