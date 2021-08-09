import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

// redux
import { useDispatch } from 'react-redux';
import { FavoriteCreators } from '../../redux/modules/favorite';
import { DetailCreators } from '../../redux/modules/detail.js';

import { Grid, Text } from '../../elements';
import ProfileImg from '../ProfileImg/index';

const ProfileCard = ({ userInfo }) => {
  const dispatch = useDispatch();

  const AddLike = () => {
    dispatch(FavoriteCreators.FavoriteAddDB({ targetPk: userInfo.userPk }));
    dispatch(DetailCreators.LikeUpdateHandler(true));
  };

  const DelLike = () => {
    dispatch(FavoriteCreators.FavoriteDelDB({ targetPk: userInfo.userPk }));
    dispatch(DetailCreators.LikeUpdateHandler(false));
  };

  return (
    <Grid
      padding="20px 0"
      margin="10px 0 0 0"
      radius="14px"
      bgColor="white"
      border="0.5px solid #E7E7E7"
    >
      <Grid position="relative" display="flex" hoz="center" ver="center">
        <ProfileImg imgUrl={userInfo && userInfo.profileImg} />
        <Grid width="75%" margin="0 0 0 13px">
          <Text fs="la" fw="bold">
            {userInfo && userInfo.nickname}
          </Text>
          <Text color="darkG">
            {userInfo && userInfo.gender === 1 ? '남자' : '여자'} ·{' '}
            {userInfo && userInfo.age}대 · {userInfo && userInfo.region}{' '}
            {userInfo && userInfo.city}
          </Text>
        </Grid>
        {{}.hasOwnProperty.call(userInfo, 'like') ? (
          <Grid
            width="auto"
            color={userInfo.like ? 'brandColor' : 'darkG'}
            position="absolute"
            top="0px"
            right="15px"
            _onClick={() => {
              userInfo.like ? DelLike() : AddLike();
            }}
          >
            {userInfo.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Grid>
        ) : null}
      </Grid>
      <span
        style={{
          width: '90%',
          height: '1px',
          borderBottom: '1px solid #e7e7e7',
          display: 'block',
          margin: '15px auto',
        }}
      />
      <Grid margin="10px 0 0 0" padding="0 20px">
        {userInfo.intro && userInfo.intro !== 'none' ? (
          <Text fs="sm">{userInfo.intro}</Text>
        ) : (
          <Text fs="sm">안녕하세요 {userInfo.nickname}입니다.</Text>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
