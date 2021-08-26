import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

// redux
import { useDispatch } from 'react-redux';
import { FavoriteCreators } from 'src/redux/modules/FavoriteModule/favorite';
import { DetailLikeUpdate } from 'src/redux/modules/DetailModule/detail';

// style
import { textOverflow, textOverflowWrap } from '../../styles/Mixin';
import { Grid, Text, Hr } from '../../elements';
import ProfileImg from '../ProfileImg/index';
// tags
import { tendencyKeyword, mbti } from '../Tag/tagList';

export interface Props {
  userInfo?: any;
}

const ProfileCard = ({ userInfo }: Props) => {
  const dispatch = useDispatch();

  const [moreIntro, setMoreIntro] = React.useState<boolean>(false);

  function IntroHandler() {
    if (moreIntro) {
      setMoreIntro(false);
    } else {
      setMoreIntro(true);
    }
  }

  const LikeToggle = () => {
    dispatch(
      FavoriteCreators.fetchFavoriteToggle({ targetPk: userInfo.userPk }),
    );
    if (userInfo.like) {
      dispatch(DetailLikeUpdate(false));
    } else {
      dispatch(DetailLikeUpdate(true));
    }
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
          <Text fs="la" fw="bold" addstyle={textOverflow()}>
            {userInfo && userInfo.nickname}
          </Text>
          <Text color="darkGray" fs="sm" addstyle={textOverflow()}>
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
            cursor="pointer"
            top="12px"
            right="12px"
            _onClick={() => {
              LikeToggle();
            }}
          >
            {userInfo.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Grid>
        ) : null}
      </Grid>
      <Hr width="100%" margin="13px 0" />
      <Grid>
        {userInfo.intro && userInfo.intro !== '0' ? (
          <>
            <Text
              fs="sm"
              ws="pre-line"
              addstyle={!moreIntro ? textOverflowWrap(3) : ''}
            >
              {userInfo.intro}
            </Text>
            <Text
              cursor="pointer"
              textAlign="center"
              margin="10px 0 0 0"
              color="gray"
              _onClick={IntroHandler}
            >
              {!moreIntro ? '더 보기' : '닫기'}
            </Text>
          </>
        ) : (
          <Text fs="sm">안녕하세요 {userInfo.nickname}입니다.</Text>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
