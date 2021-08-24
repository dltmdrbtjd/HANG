import React from 'react';
import { useLocation } from 'react-router';
// redux
import { useDispatch } from 'react-redux';
// style
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { SearchLikeUpdate } from 'src/redux/modules/SearchModule/search';
import { FavoriteCreators } from 'src/redux/modules/FavoriteModule/favorite';
import { HomeLikeUpdate } from 'src/redux/modules/HomeModule/home';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
import { history } from '../../redux/configureStore';
import { Grid, Text } from '../../elements';
import ProfileImg from '../ProfileImg/index';
// import SmallMobileProfileSize from './style';
// import { SetTabFontSize } from '../../pages/MyPage/Promise/PromiseCard/style';
import { limitWidth, textOverflow } from '../../styles/Mixin';

export type Props = {
  userInfo: any;
  category?: undefined | string;
  idx: number;
};

const SearchCard = ({ userInfo, category, idx }: Props) => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  const LikeToggle = () => {
    dispatch(
      FavoriteCreators.fetchFavoriteToggle({ targetPk: userInfo.userPk }),
    );
    if (path.includes('/search')) {
      if (userInfo.like) {
        dispatch(SearchLikeUpdate({ idx, like: false }));
      } else {
        dispatch(SearchLikeUpdate({ idx, like: true }));
        dispatch(fetchMessage({ Message: true }));
      }
    } else if (path.includes('/')) {
      if (userInfo.like) {
        dispatch(HomeLikeUpdate({ category, idx, like: false }));
      } else {
        dispatch(HomeLikeUpdate({ category, idx, like: true }));
        dispatch(fetchMessage({ Message: true }));
      }
    }
  };

  return (
    <Grid padding="6px 0">
      <Grid
        position="relative"
        isFlex
        ver="center"
        padding="12px 20px"
        radius="14px"
        bgColor="white"
        border="0.5px solid #e7e7e7"
        z="1"
      >
        <ProfileImg size="medium" imgUrl={userInfo && userInfo.profileImg} />
        <Grid
          width="calc(100% - 120px)"
          height="47px"
          margin="0 0 0 10px"
          cursor="pointer"
          isFlex
          column
          hoz="space-between"
          _onClick={() => history.push(`/detail?user=${userInfo.userPk}`)}
        >
          <Text fs="la" fw="bold" addstyle={textOverflow()}>
            {userInfo && userInfo.nickname}
          </Text>
          <Text
            color="darkGray"
            fs="sm"
            // mobile={SetTabFontSize('sm')}
            addstyle={textOverflow()}
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
          cursor="pointer"
          _onClick={() => {
            LikeToggle();
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
