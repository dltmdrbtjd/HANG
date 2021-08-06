import React from 'react';
// redux
import { useDispatch } from 'react-redux';
// style
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FavoriteCreators } from '../../redux/modules/favorite';
import { HomeCreators } from '../../redux/modules/home';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { history } from '../../redux/configureStore';
import { Grid, Text } from '../../elements';
import ProfileImg from '../ProfileImg/index';

const SearchCard = ({ userInfo, category, idx }) => {
  const dispatch = useDispatch();

  const AddLike = () => {
    dispatch(FavoriteCreators.FavoriteAddDB({ targetPk: userInfo.userPk }));
    dispatch(HomeCreators.likeUpdateHandler(category, idx, true));
  };

  const DelLike = () => {
    dispatch(FavoriteCreators.FavoriteDelDB({ targetPk: userInfo.userPk }));
    dispatch(HomeCreators.likeUpdateHandler(category, idx, false));
  };
  return (
    <Grid padding="10px 0">
      <Grid
        position="relative"
        display="flex"
        hoz="center"
        ver="center"
        padding="10px 0"
        margin="10px 0 0 0"
        radius="14px"
        bgColor="white"
        shadow="0 4px 4px rgba(134, 134, 134, 0.3)"
        z="1"
      >
        <ProfileImg imgUrl={userInfo && userInfo.profileImg} />
        <Grid
          width="75%"
          margin="0 0 0 10px"
          _onClick={() => {
            history.push(`/detail?user=${userInfo.userPk}`);
          }}
        >
          <Text fs="la" fw="bold">
            {userInfo && userInfo.nickname}
          </Text>
          <Text color="darkG">
            {userInfo && userInfo.gender === 1 ? '남자' : '여자'} ·{' '}
            {userInfo && userInfo.age}대 ·{userInfo && userInfo.region}{' '}
            {userInfo && userInfo.city}
          </Text>
        </Grid>
        {userInfo && userInfo.like ? (
          <Grid
            width="auto"
            color="brandColor"
            position="absolute"
            top="10px"
            right="10px"
            _onClick={DelLike}
            z="2"
          >
            <FavoriteIcon />
          </Grid>
        ) : (
          <Grid
            width="auto"
            color="darkG"
            position="absolute"
            top="10px"
            right="10px"
            _onClick={AddLike}
            z="2"
          >
            <FavoriteBorderIcon />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchCard;
