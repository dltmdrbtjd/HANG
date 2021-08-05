import React from 'react';
// history
// style
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { history } from '../../redux/configureStore';
import { Grid, Text } from '../../elements';
import ProfileImg from '../ProfileImg/index';

const SearchCard = ({ userInfo }) => {
  return (
    <Grid
      _onClick={() => {
        history.push('/detail');
      }}
      padding="10px 0"
    >
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
      >
        <ProfileImg imgUrl={userInfo && userInfo.profileImg} />
        <Grid width="75%" margin="0 0 0 10px">
          <Text fs="la" fw="bold">
            {userInfo && userInfo.username}
          </Text>
          <Text color="darkG">
            {userInfo && userInfo.gender} · {userInfo && userInfo.age} ·
            {userInfo && userInfo.region} {userInfo && userInfo.city}
          </Text>
        </Grid>
        <Grid
          width="auto"
          color="darkG"
          position="absolute"
          top="10px"
          right="10px"
        >
          <FavoriteBorderIcon />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchCard;
