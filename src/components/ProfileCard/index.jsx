import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

// redux
import { useDispatch } from 'react-redux';
import { FavoriteCreators } from '../../redux/modules/favorite';
import { DetailCreators } from '../../redux/modules/detail.js';

import { Grid, Text, Hr } from '../../elements';
import ProfileImg from '../ProfileImg/index';
// style
import { SetTabFontSize } from '../../pages/MyPage/Promise/PromiseCard/style';
import { textOverflow } from '../../styles/Mixin';

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
      padding="14px 21px"
      margin="10px 0 0 0"
      radius="14px"
      bgColor="white"
      border="0.5px solid #E7E7E7"
      position="relative"
    >
      <Grid isFlex ver="center">
        <ProfileImg imgUrl={userInfo && userInfo.profileImg} />
        <Grid width="75%" margin="0 0 0 13px">
          <Text fs="la" fw="bold">
            {userInfo && userInfo.nickname}
          </Text>
          <Text
            color="darkG"
            addstyle={textOverflow()}
            mobile={SetTabFontSize('sm')}
          >
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
            top="12px"
            right="12px"
            _onClick={() => {
              userInfo.like ? DelLike() : AddLike();
            }}
          >
            {userInfo.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Grid>
        ) : null}
      </Grid>
      <Hr width="100%" margin="15px 0" />
      <Grid margin="10px 0 0 0">
        {userInfo.intro !== 'none' ? (
          <Text fs="sm">{userInfo.intro}</Text>
        ) : (
          <Text fs="sm">안녕하세요 {userInfo.nickname}입니다.</Text>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
