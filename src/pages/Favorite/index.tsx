import React from 'react';

// reudx
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux';
import {
  FavoriteCreators,
  favoriteDelete,
} from 'src/redux/modules/FavoriteModule/favorite';
import { history, useTypedSelector } from '../../redux/configureStore';
// style
import { Container, Grid, Text, Image } from '../../elements';
import ProfileImg from '../../components/ProfileImg';
// style
import { textOverflow } from '../../styles/Mixin';
import NotFound from './style';

const Favorite = () => {
  const dispatch = useDispatch();
  const FavoriteList: any = useTypedSelector((state) => state.favorite.list);

  const DelLike = (userPk: number) => {
    dispatch(FavoriteCreators.fetchFavoriteToggle({ targetPk: userPk }));
    dispatch(favoriteDelete(userPk));
  };

  React.useEffect(() => {
    dispatch(FavoriteCreators.fetchFavoriteLoad());
  }, []);

  return (
    <Container padding="70px 0 80px 0">
      {FavoriteList
        ? FavoriteList.map((item, idx) => {
            return (
              <Grid
                position="relative"
                z="1"
                isFlex
                hoz="center"
                ver="center"
                border="0.5px solid #E7E7E7"
                borDirection="bottom"
                padding="20px 0"
                cursor="pointer"
                key={idx}
              >
                <Grid width="60px" height="60px">
                  <ProfileImg imgUrl={item.profileImg} />
                </Grid>
                <Grid
                  width="calc(100% - 90px)"
                  margin="0 0 0 23px"
                  cursor="pointer"
                  _onClick={() => {
                    history.push(`/detail?user=${item.userPk}`);
                  }}
                >
                  <Text fs="la" fw="bold">
                    {item.nickname}
                  </Text>
                  <Text fs="sm" color="darkGray" addstyle={textOverflow()}>
                    {item.gender === 1 ? '남자' : '여자'} · {item.age}대 ·{' '}
                    {item.region} {item.city}
                  </Text>
                </Grid>
                <Grid
                  width="auto"
                  color="brandColor"
                  position="absolute"
                  top="20px"
                  right="10px"
                  z="2"
                  _onClick={() => DelLike(item.userPk)}
                >
                  <FavoriteIcon />
                </Grid>
              </Grid>
            );
          })
        : ''}
      {FavoriteList && FavoriteList.length < 1 ? (
        <Grid addstyle={NotFound}>
          <Image
            width="100%"
            src="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/notfound/favoritenotfound.png"
          />
          <Text margin="12px 0 0 0" textAlign="center">
            관심목록에 추가된 사람이 없습니다.
          </Text>
        </Grid>
      ) : null}
    </Container>
  );
};

export default Favorite;
