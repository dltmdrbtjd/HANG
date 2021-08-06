import React, { useEffect } from 'react';

// reudx
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../redux/configureStore';
import { FavoriteCreators } from '../../redux/modules/favorite';
// style
import { Grid, Text } from '../../elements';
import ProfileImg from '../../components/ProfileImg';

const Favorite = () => {
  const dispatch = useDispatch();
  const FavoriteList = useSelector(state => state.favorite.list);
  const like = useSelector(state => state.favorite.boolean);

  const DelLike = userPk => {
    dispatch(FavoriteCreators.FavoriteDelDB({ targetPk: userPk }));
    dispatch(FavoriteCreators.FavoriteDelHandler(userPk));
  };

  useEffect(() => {
    dispatch(FavoriteCreators.FavoriteLoadDB());
  }, [like]);
  return (
    <>
      {FavoriteList
        ? FavoriteList.map((item, idx) => {
            return (
              <Grid
                position="relative"
                z="1"
                display="flex"
                hoz="center"
                ver="center"
                borderbot="1px solid #c4c4c4"
                padding="20px 0"
                key={idx}
              >
                <ProfileImg imgUrl={item.profileImg} />
                <Grid
                  margin="0 0 0 23px"
                  _onClick={() => {
                    history.push(`/detail?user=${item.userPk}`);
                  }}
                >
                  <Text fs="la" fw="bold">
                    {item.nickname}
                  </Text>
                  <Text fs="sm">
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
    </>
  );
};

export default Favorite;
