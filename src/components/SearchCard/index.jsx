import React from 'react';
// history
// style
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { history } from '../../redux/configureStore';
import { Grid, Text } from '../../elements';
import ProfileImg from '../ProfileImg/index';

const SearchCard = ({ ...props }) => {
  const { username, age, city, gender, imgUrl } = props;
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
        <ProfileImg imgUrl={imgUrl} />
        <Grid width="75%" margin="0 0 0 10px">
          <Text fs="la" fw="bold">
            {username}
          </Text>
          <Text color="darkG">
            {gender} · {age} · {city}
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
