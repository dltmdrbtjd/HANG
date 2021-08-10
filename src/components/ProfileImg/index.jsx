import React from 'react';
// elements
import { Grid, Image } from '../../elements/index';
// style
import setProfileImageSize from './style';
// image
import defaultProfile from '../../Images/profile.png';

const ProfileImg = ({ size, imgUrl }) => {
  return (
    <Grid
      isFlex
      hoz="center"
      ver="center"
      overflow="hidden"
      radius="50%"
      color="gray"
      addstyle={setProfileImageSize(size)}
    >
      <Image
        src={imgUrl && imgUrl !== 'null' ? imgUrl : defaultProfile}
        alt="profile image"
      />
    </Grid>
  );
};

export default ProfileImg;
