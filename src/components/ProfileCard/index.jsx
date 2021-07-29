import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Grid, Text } from '../../elements';
import ProfileImg from '../ProfileImg/index';

const ProfileCard = ({ username, age, city, gender, text, imgUrl }) => {
  return (
    <Grid
      padding="20px 0"
      margin="10px 0 0 0"
      radius="14px"
      bgColor="white"
      shadow="0 4px 4px rgba(134, 134, 134, 0.3)"
    >
      <Grid position="relative" display="flex" hoz="center" ver="center">
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
      <Grid margin="10px 0 0 0" padding="0 20px">
        <Text fs="sm">{text}</Text>
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
