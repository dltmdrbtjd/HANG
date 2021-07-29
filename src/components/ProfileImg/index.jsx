import React from 'react';
// elements
import { Grid, Image } from '../../elements/index';

const ProfileImg = ({ size, imgUrl }) => {
  switch (size) {
    case 'large':
      return (
        <Grid
          display="flex"
          hoz="center"
          ver="center"
          width="100px"
          height="100px"
          overflow="hidden"
          radius="50%"
        >
          <Image src={imgUrl} alt="profile image" />
        </Grid>
      );

    case 'midium':
      return (
        <Grid
          display="flex"
          hoz="center"
          ver="center"
          width="60px"
          height="60px"
          overflow="hidden"
          radius="50%"
        >
          <Image src={imgUrl} alt="profile image" />
        </Grid>
      );

    case 'small':
      return (
        <Grid
          display="flex"
          hoz="center"
          ver="center"
          width="20px"
          height="20px"
          overflow="hidden"
          radius="50%"
        >
          <Image src={imgUrl} alt="profile image" />
        </Grid>
      );

    default:
      return (
        <Grid
          display="flex"
          hoz="center"
          ver="center"
          width="60px"
          height="60px"
          overflow="hidden"
          radius="50%"
        >
          <Image src={imgUrl} alt="profile image" />
        </Grid>
      );
  }
};

export default ProfileImg;
