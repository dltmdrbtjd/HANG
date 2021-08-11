import React from 'react';
// elements
import { Grid, Image } from '../../elements/index';
// style
import { setProfileImageSize, ImagePosition } from './style';
// image
import defaultProfile from '../../Images/profile.png';

const ProfileImg = ({ size, imgUrl, mobile }) => {
  return (
    <Grid
      overflow="hidden"
      radius="50%"
      color="gray"
      addstyle={setProfileImageSize(size)}
      position="relative"
      mobile={mobile}
    >
      <Image
        src={imgUrl && imgUrl !== 'null' ? imgUrl : defaultProfile}
        alt="profile image"
        addstyle={ImagePosition}
      />
    </Grid>
  );
};

export default ProfileImg;
