import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Grid, Text } from '../../elements';
import ProfileImg from '../ProfileImg/index';

const ProfileCard = ({ userInfo }) => {
  return (
    <Grid
      padding="20px 0"
      margin="10px 0 0 0"
      radius="14px"
      bgColor="white"
      shadow="0 4px 4px rgba(134, 134, 134, 0.3)"
    >
      <Grid position="relative" display="flex" hoz="center" ver="center">
        <ProfileImg imgUrl={userInfo && userInfo.profileImg} />
        <Grid width="75%" margin="0 0 0 10px">
          <Text fs="la" fw="bold">
            {userInfo && userInfo.nickname}
          </Text>
          <Text color="darkG">
            {userInfo && userInfo.gender === 1 ? '남자' : '여자'} ·{' '}
            {userInfo && userInfo.age}대 · {userInfo && userInfo.city}{' '}
            {userInfo && userInfo.region}
          </Text>
        </Grid>
        {{}.hasOwnProperty.call(userInfo, 'like') ? (
          <Grid
            width="auto"
            color="darkG"
            position="absolute"
            top="10px"
            right="10px"
          >
            <FavoriteBorderIcon />
          </Grid>
        ) : null}
      </Grid>
      <Grid margin="10px 0 0 0" padding="0 20px">
        {userInfo.contents ? (
          <Text fs="sm">{userInfo.intro}</Text>
        ) : (
          <Text fs="sm">안녕하세요 {userInfo.nickname}입니다.</Text>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
