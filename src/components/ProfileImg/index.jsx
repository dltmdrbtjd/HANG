import React from 'react';
// icon
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// elements
import { Grid, Image } from '../../elements/index';
// style
import setProfileImageSize from './style';

const ProfileImg = ({ size = 'medium', imgUrl }) => {
  return (
    <Grid
      display="flex"
      hoz="center"
      ver="center"
      width={setProfileImageSize[size].width}
      height={setProfileImageSize[size].height}
      overflow="hidden"
      radius="50%"
      color="gray"
    >
      {imgUrl ? (
        <Image src={imgUrl} alt="profile image" />
      ) : (
        <AccountCircleIcon
          style={{ fontSize: `${setProfileImageSize[size].fontSize}` }}
        />
      )}
    </Grid>
  );
};

export default ProfileImg;
