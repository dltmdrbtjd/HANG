import React from 'react';
import { useLocation } from 'react-router';
// redux
import { useDispatch } from 'react-redux';
// style
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FavoriteCreators } from '../../redux/modules/favorite';
import { HomeCreators } from '../../redux/modules/home';
import { SearchCreators } from '../../redux/modules/search';
import { history } from '../../redux/configureStore';
import { Grid, Text } from '../../elements';
import ProfileImg from '../ProfileImg/index';
import SmallMobileProfileSize from './style';
import { SetTabFontSize } from '../../pages/MyPage/Promise/PromiseCard/style';
import { textOverflow } from '../../styles/Mixin';

const SearchCard = ({ userInfo, category, idx }) => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  const AddLike = () => {
    dispatch(FavoriteCreators.FavoriteAddDB({ targetPk: userInfo.userPk }));
    if (path.includes('/search')) {
      dispatch(SearchCreators.likeUpdateHandler(idx, true));
    } else if (path.includes('/')) {
      dispatch(HomeCreators.likeUpdateHandler(category, idx, true));
    }
  };

  const DelLike = () => {
    dispatch(FavoriteCreators.FavoriteDelDB({ targetPk: userInfo.userPk }));
    if (path.includes('/search')) {
      dispatch(SearchCreators.likeUpdateHandler(idx, false));
    } else if (path.includes('/')) {
      dispatch(HomeCreators.likeUpdateHandler(category, idx, false));
    }
  };
  return (
    <Grid padding="6px 0">
      <Grid
        position="relative"
        isFlex
        padding="12px 20px"
        radius="14px"
        bgColor="white"
        border="0.5px solid #e7e7e7"
        z="1"
      >
        <ProfileImg
          imgUrl={userInfo && userInfo.profileImg}
          mobile={SmallMobileProfileSize}
        />
        <Grid
          width="70%"
          margin="0 0 0 10px"
          _onClick={() => {
            history.push(`/detail?user=${userInfo.userPk}`);
          }}
        >
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

        <Grid
          width="auto"
          color={userInfo.like ? 'brandColor' : 'darkG'}
          position="absolute"
          top="12px"
          right="12px"
          _onClick={() => {
            userInfo.like ? DelLike() : AddLike();
          }}
          z="2"
        >
          {userInfo.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchCard;
