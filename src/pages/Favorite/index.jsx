import React from 'react';

// reudx
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { history } from '../../redux/configureStore';
// style
import { Grid, Text } from '../../elements';
import ProfileImg from '../../components/ProfileImg';

const Favorite = () => {
  const list = [
    {
      nickname: 'dltmdrbtjd',
      age: '20대',
      city: '서울특별시 서초구',
      gender: '남자',
      imgUrl: '',
    },
    {
      nickname: '새싹몬',
      age: '30대',
      city: '서울특별시 강남구',
      gender: '여자',
      imgUrl: '',
    },
    {
      nickname: '새싹님',
      age: '30대',
      city: '서울특별시 금천구',
      gender: '남자',
      imgUrl: '',
    },
  ];
  return (
    <>
      {list.map((item, idx) => (
        <Grid
          position="relative"
          display="flex"
          hoz="center"
          ver="center"
          borderbot="1px solid #c4c4c4"
          padding="20px 0"
          key={idx}
          _onClick={() => {
            history.push('/detail');
          }}
        >
          <ProfileImg imgUrl={item.imgUrl} />
          <Grid margin="0 0 0 23px">
            <Text fs="la" fw="bold">
              {item.nickname}
            </Text>
            <Text fs="sm">
              {item.gender} · {item.age} · {item.city}
            </Text>
          </Grid>
          <Grid
            width="auto"
            color="darkG"
            position="absolute"
            top="20px"
            right="10px"
          >
            <FavoriteBorderIcon />
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default Favorite;
