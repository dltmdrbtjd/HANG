import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

// redux
import { useDispatch } from 'react-redux';
import { FavoriteCreators } from 'src/redux/modules/FavoriteModule/favorite';
import { DetailLikeUpdate } from 'src/redux/modules/DetailModule/detail';

// style
import { TagsBox } from 'src/styles/Mixin/boxStyle';
import { textOverflow, textOverflowWrap } from '../../styles/Mixin';
import { Grid, Text, Hr } from '../../elements';
import ProfileImg from '../ProfileImg/index';
// tags
import { tendencyKeyword, mbti } from '../Tag/tagList';
import Tag from '../Tag';

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

  function TagCheck() {
    if (userInfo.tags && userInfo.tags !== '0') {
      return userInfo.tags.split(':').map((i) => +i);
    }
    return null;
  }
  const UserTag = TagCheck();

  function TagListCheck() {
    if (UserTag === null) {
      return undefined;
    }
    return [
      tendencyKeyword[UserTag[0]],
      tendencyKeyword[UserTag[1]],
      tendencyKeyword[UserTag[2]],
      mbti[UserTag[3]],
    ];
  }
  const UserTagList = TagListCheck();

  function LastTagCheck() {
    if (UserTagList !== undefined) {
      return UserTagList.filter((nan) => nan !== undefined);
    }
    return undefined;
  }
  const Tags = LastTagCheck();

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
      <Grid margin="8px 0 0 0" addstyle={TagsBox}>
        {Tags &&
          Tags.map((item, idx) => {
            return (
              <Tag list={Tags} key={idx}>
                {item}
              </Tag>
            );
          })}
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
            {userInfo.intro.split('\n').length > 3 ? (
              <Text
                cursor="pointer"
                textAlign="center"
                margin="10px 0 0 0"
                color="gray"
                _onClick={IntroHandler}
              >
                {!moreIntro ? '더 보기' : '닫기'}
              </Text>
            ) : null}
          </>
        ) : (
          <Text fs="sm">안녕하세요 {userInfo.nickname}입니다.</Text>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
